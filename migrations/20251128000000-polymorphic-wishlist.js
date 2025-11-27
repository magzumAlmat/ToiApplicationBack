'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add event_type and event_id columns
    await queryInterface.addColumn('Wishlist', 'event_type', {
      type: Sequelize.STRING,
      allowNull: true, // Temporarily allow null
    });
    await queryInterface.addColumn('Wishlist', 'event_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Temporarily allow null
    });

    // Copy data from wedding_id to event_id and set event_type to 'wedding'
    await queryInterface.sequelize.query(
      `UPDATE "Wishlist" SET "event_id" = "wedding_id", "event_type" = 'wedding' WHERE "wedding_id" IS NOT NULL`
    );

    // Remove the foreign key constraint from wedding_id column
    try {
        await queryInterface.sequelize.query('ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_wedding_id_fkey";');
    } catch (e) {
        // It's possible the constraint has a different name or doesn't exist.
        // We'll log a warning and proceed. If the constraint still exists, removeColumn will fail.
        console.warn('Could not drop constraint "Wishlist_wedding_id_fkey". It might not exist or have a different name.', e.message);
    }

    // Now remove the old wedding_id column
    await queryInterface.removeColumn('Wishlist', 'wedding_id');

    // Finally, make the new columns not nullable
    await queryInterface.changeColumn('Wishlist', 'event_type', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Wishlist', 'event_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Add the wedding_id column back
    await queryInterface.addColumn('Wishlist', 'wedding_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Temporarily
    });

    // 2. Copy data back from event_id for 'wedding' types
    await queryInterface.sequelize.query(
      `UPDATE "Wishlist" SET "wedding_id" = "event_id" WHERE "event_type" = 'wedding'`
    );

    // 3. Add the foreign key constraint back
    await queryInterface.addConstraint('Wishlist', {
        fields: ['wedding_id'],
        type: 'foreign key',
        name: 'Wishlist_wedding_id_fkey', // Assuming this was the name
        references: {
          table: 'Weddings',
          field: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    });
    
    // 4. Make wedding_id not nullable
    await queryInterface.changeColumn('Wishlist', 'wedding_id', {
        type: Sequelize.INTEGER,
        allowNull: false
    });

    // 5. Remove the polymorphic columns
    await queryInterface.removeColumn('Wishlist', 'event_type');
    await queryInterface.removeColumn('Wishlist', 'event_id');
  }
};
