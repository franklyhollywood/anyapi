const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Projector = require('../lib/models/Projector.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a projector', async () => {
    const res = await request(app).post('/api/v1/projectors').send({
      brand: 'Bolex',
      model: 'S215',
      size: '16mm',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      brand: 'Bolex',
      model: 'S215',
      size: '16mm',
    });
  });

  it('should get a projector by id', async () => {
    const projector = await Projector.insert({
      brand: 'Bolex',
      model: 'S215',
      size: '16mm',
    });
    const res = await request(app).get('/api/v1/projectors/1');
    expect(res.body).toEqual(projector);
  });

  it('should list all the projectors', async () => {
    const projector = await Projector.insert({
      brand: 'Bolex',
      model: 'S215',
      size: '16mm',
    });
    const projector2 = await Projector.insert({
      brand: 'Bolex',
      model: 'S215',
      size: '16mm',
    });
    const res = await request(app).get('/api/v1/projectors');
    expect(res.body).toEqual([projector, projector2]);
  });

  it('should update projector by id', async () => {
    const projector = await Projector.insert({
      brand: 'Bolex',
      model: 'S215',
      size: '16mm',
    });
    const res = await request(app)
      .patch('/api/v1/projectors/1')
      .send({ model: 'S215' });

    expect(res.body).toEqual({
      ...projector,
      model: 'S215',
    });
  });

  it('should delete a projector by id', async () => {
    const noProjector = await Projector.insert({
      brand: 'Bolex',
      model: 'S215',
      size: '16mm',
    });
    const res = await request(app).delete(
      `/api/v1/projectors/${noProjector.id}`
    );
    expect(res.body).toEqual(noProjector);
    expect(await Projector.getById(noProjector.id)).toBeNull();
  });
});
