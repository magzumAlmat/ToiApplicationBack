const { Wedding, Goods, Wishlist, User, Courses, Restaurant, Hotel, Program, Stream, Alcohol, Cakes, Clothing, Flowers, Jewelry, TechnicalEquipmentRental, Tamada, TraditionalGifts, Transport, Typography, Suvenirs, EventCategory } = require('../models');

// Map event types to their corresponding models
const eventModels = {
    wedding: Wedding,
    course: Courses,
    restaurant: Restaurant,
    hotel: Hotel,
    program: Program,
    stream: Stream,
    alcohol: Alcohol,
    cake: Cakes, // Assuming 'cake' is the eventType for Cakes
    clothing: Clothing,
    flower: Flowers, // Assuming 'flower' for Flowers
    jewelry: Jewelry,
    technicalequipmentrental: TechnicalEquipmentRental,
    tamada: Tamada,
    traditionalgift: TraditionalGifts,
    transport: Transport,
    typography: Typography,
    souvenir: Suvenirs, // Assuming 'souvenir' for Suvenirs
    eventcategory: EventCategory // Assuming 'eventcategory' for EventCategory
    // Add other event types here as needed
};

// Helper to get event model and check for existence
const getEvent = async (eventType, eventId) => {
    const Model = eventModels[eventType];
    if (!Model) {
        return null; // Event type not supported
    }

    const event = await Model.findByPk(eventId);
    if (!event) {
        return null;
    }
    return event;
};

const createWishlistItem = async (req, res) => {
  console.log('createWishlist started');
  const { event_id, event_type, good_id, item_name, description } = req.body;
  const userId = req.user?.id;

  if (!event_id || !event_type) {
    return res.status(400).json({
      success: false,
      error: 'event_id and event_type are required',
    });
  }

  if (!good_id && !item_name) {
    return res.status(400).json({
      success: false,
      error: 'Either good_id or item_name must be provided',
    });
  }

  try {
    const event = await getEvent(event_type, event_id);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }
  if (event.host_id && event.host_id !== userId) {
  return res.status(403).json({ success: false, error: 'Only the event host can add items' });
}

    let goodIdToUse = good_id;
    if (!goodIdToUse) {
        // If good_id is not provided, create a new Good on the fly.
        const newGood = await Goods.create({
            item_name: item_name,
            description: description || '',
            category: 'custom', // Default category
        });
        goodIdToUse = newGood.id;
    }

    const good = await Goods.findByPk(goodIdToUse);
    if (!good) {
        return res.status(404).json({ success: false, error: 'Good not found' });
    }

   console.log('Creating wishlist item:', {
    event_id,
    event_type,
    good_id: good.id,
    item_name: good.item_name,
    description: good.description
});
    const wishlistItem = await Wishlist.create({
        event_id,
        event_type,
        good_id: good.id,
        item_name: good.item_name || '',
        description: good.description || '',
        reserved_by_unknown: ''
    });

    res.status(201).json({
      success: true,
      data: wishlistItem,
      message: 'Item added to wishlist',
    });

    
  } catch (error) {
   console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
    });
    res.status(500).json({ success: false, error: 'Server error', details: error.message });
  }
};

const getWishlistByEvent = async (req, res) => {
  const { eventType, eventId } = req.params;
  console.log(`GET WISHLIST BY EVENT started eventType=${eventType}, eventId=${eventId}`);

  try {
    const wishlistItems = await Wishlist.findAll({
      where: { event_id: eventId, event_type: eventType },
      include: [
        {
          model: User,
          as: 'Reserver',
          attributes: ['id', 'username'],
        },
        {
          model: Goods,
          as: 'Good',
          attributes: ['id', 'item_name', 'category', 'cost', 'description', 'specs'],
        },
      ],
    });

    if (!wishlistItems.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'Wishlist is empty',
      });
    }

    const formattedItems = wishlistItems.map((item) => ({
        id: item.id,
        event_id: item.event_id,
        event_type: item.event_type,
        item_name: item.good_id ? item.Good?.item_name : item.item_name,
        category: item.good_id ? item.Good?.category : null,
        cost: item.good_id ? item.Good?.cost : null,
        description: item.good_id ? item.Good?.description : item.description,
        specs: item.good_id ? item.Good?.specs : null,
        is_reserved: item.is_reserved,
        reserved_by: item.reserved_by,
        reserved_by_unknown: item.reserved_by_unknown,
        created_at: item.created_at,
        updated_at: item.updated_at,
        Reserver: item.Reserver,
      }));

    console.log('found wishlist', formattedItems);
    res.status(200).json({ success: true, data: formattedItems });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getWishlistItem = async (req, res) => {
  const { id } = req.params;

  try {
    const wishlistItem = await Wishlist.findByPk(id, {
      include: [{ model: User, as: 'Reserver', attributes: ['id', 'username'] }],
    });

    if (!wishlistItem) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.status(200).json({ success: true, data: wishlistItem });
  } catch (error) {
    console.error('Error fetching wishlist item:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const reserveWishlistItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const wishlistItem = await Wishlist.findByPk(id);
    if (!wishlistItem) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    if (wishlistItem.is_reserved) {
      return res.status(400).json({ success: false, error: 'This gift is already reserved' });
    }

    const event = await getEvent(wishlistItem.event_type, wishlistItem.event_id);
    if (event && event.host_id === userId) {
      return res.status(403).json({ success: false, error: 'Event host cannot reserve gifts' });
    }

    await wishlistItem.update({
      is_reserved: true,
      reserved_by: userId,
    });

    const updatedItem = await Wishlist.findByPk(id, {
      include: [{ model: User, as: 'Reserver', attributes: ['id', 'username'] }],
    });

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: 'Gift reserved successfully',
    });
  } catch (error) {
    console.error('Error reserving gift:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};


const reserveWishlistItemByUnknown = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const unknownUser = req.body.data?.reserved_by_unknown;

  if (!unknownUser) {
    return res.status(400).json({ success: false, error: 'reserved_by_unknown is required' });
  }
  
  try {
    const wishlistItem = await Wishlist.findByPk(id);
    if (!wishlistItem) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    if (wishlistItem.is_reserved) {
      return res.status(400).json({ success: false, error: 'This gift is already reserved' });
    }

    const event = await getEvent(wishlistItem.event_type, wishlistItem.event_id);
    if (event && event.host_id === userId) {
      return res.status(403).json({ success: false, error: 'Event host cannot reserve gifts' });
    }

    await wishlistItem.update({
      is_reserved: true,
      reserved_by_unknown: unknownUser,
    });

    const updatedItem = await Wishlist.findByPk(id, {
      include: [{ model: User, as: 'Reserver', attributes: ['id', 'username'] }],
    });

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: 'Gift reserved successfully',
    });
  } catch (error) {
    console.error('Error reserving gift:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const deleteWishlistItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const wishlistItem = await Wishlist.findByPk(id);
    if (!wishlistItem) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    const event = await getEvent(wishlistItem.event_type, wishlistItem.event_id);
    if (!event || event.host_id !== userId) {
      return res.status(403).json({ success: false, error: 'Only the event host can delete items' });
    }

    await wishlistItem.destroy();

    res.status(200).json({
      success: true,
      message: 'Item deleted from wishlist',
    });
  } catch (error) {
    console.error('Error deleting wishlist item:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = {
  createWishlistItem,
  getWishlistByEvent,
  getWishlistItem,
  reserveWishlistItem,
  deleteWishlistItem,
  reserveWishlistItemByUnknown
};