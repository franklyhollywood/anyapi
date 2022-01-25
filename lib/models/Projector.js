const pool = require('../utils/pool');

module.exports = class Projector {
  id;
  brand;
  model;
  size;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.model = row.model;
    this.size = row.size;
  }
  static async insert({ brand, model, size }) {
    const { rows } = await pool.query(
      'INSERT INTO projectors(brand, model, size) VALUES ($1, $2, $3) RETURNING *;',
      [brand, model, size]
    );
    return new Projector(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM projectors;');
    return rows.map((row) => new Projector(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM projectors WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Projector(rows[0]);
  }

  static async updateById(id, { brand, model, size }) {
    const result = await pool.query(
      `
      SELECT * FROM projectors WHERE id=$1;
      `,
      [id]
    );
    const existingProjector = result.rows[0];

    if (!existingProjector) {
      const error = new Error(`Projector ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newbrand = brand ?? existingProjector.brand;
    const newmodel = model ?? existingProjector.model;
    const newsize = size ?? existingProjector.size;
    const { rows } = await pool.query(
      'UPDATE projectors SET brand=$2, model=$3, size=$4 WHERE id=$1 RETURNING *;',
      [id, newbrand, newmodel, newsize]
    );
    return new Projector(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM projectors WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Projector(rows[0]);
  }
};
