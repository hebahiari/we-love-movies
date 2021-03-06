exports.up = function(knex) {
    return knex.schema.createTable("movies", (table) => {
        table.increments("movie_id").primary();
        table.string("title");
        table.string("rating");
        table.string("image_url");
        table.text("description");
        table.integer("runtime_in_minutes");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies");
};