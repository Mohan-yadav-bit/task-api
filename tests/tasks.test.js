const request = require('supertest');
const app = require('../src/app');

describe('Task API', () => {

  test('Create task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test task', priority: 'low' });

    expect(res.statusCode).toBe(201);
  });

  test('Get tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
  });

});

test('Complete task', async () => {
  const create = await request(app)
    .post('/tasks')
    .send({ title: 'Complete test', priority: 'low' });

  const id = create.body.id;

  const res = await request(app)
    .patch(`/tasks/${id}/complete`);

  expect(res.statusCode).toBe(200);
});

test('Assign task', async () => {
  const create = await request(app)
    .post('/tasks')
    .send({ title: 'Assign test', priority: 'low' });

  const id = create.body.id;

  const res = await request(app)
    .patch(`/tasks/${id}/assign`)
    .send({ assignee: "Mohan" });

  expect(res.statusCode).toBe(200);
  expect(res.body.assignee).toBe("Mohan");
});