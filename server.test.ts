import { test, expect } from 'bun:test';

import supertest from 'supertest';
import {server} from './server';

// Wrap the server with Supertest
const request = supertest(server);

test('POST / with valid Pennsylvia coordinates', async () => {
    // a known point inside a state (pennsylvania) for testing
    const latitude = '40.51379'; // Example latitude
    const longitude = '-77.036133'; // Example longitude

    const response = await request.post('/')
        .send(`latitude=${latitude}&longitude=${longitude}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(200);
    // Expect the response text to be the name of the state - pennsylvania
    expect(response.text).toBe("Pennsylvania");
});

test('POST / with valid California coordinates', async () => {
    // A known point inside California for testing - Los Angeles coordinates
    const latitude = '34.0522'; // Example latitude for Los Angeles
    const longitude = '-118.2437'; // Example longitude for Los Angeles

    const response = await request.post('/')
        .send(`latitude=${latitude}&longitude=${longitude}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(200);
    // Expect the response text to be the name of the state - California
    expect(response.text).toBe("California");
});

test('POST / with valid Florida coordinates', async () => {
    const latitude = '28.5383'; // Orlando, Florida latitude
    const longitude = '-81.3792'; // Orlando, Florida longitude

    const response = await request.post('/')
        .send(`latitude=${latitude}&longitude=${longitude}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(200);
    expect(response.text).toBe("Florida");
});


test('POST / with valid New York coordinates', async () => {
    const latitude = '40.7128'; // New York City latitude
    const longitude = '-74.0060'; // New York City longitude

    const response = await request.post('/')
        .send(`latitude=${latitude}&longitude=${longitude}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(200);
    expect(response.text).toBe("New York");
});

test('POST / with valid Texas coordinates', async () => {
    const latitude = '30.2672'; // Austin, Texas latitude
    const longitude = '-97.7431'; // Austin, Texas longitude

    const response = await request.post('/')
        .send(`latitude=${latitude}&longitude=${longitude}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(200);
    expect(response.text).toBe("Texas");
});

test('POST / with international coordinates', async () => {
    const latitude = '0'; // off the coast of Africa
    const longitude = '0'; // off the coast of Africa

    const response = await request.post('/')
        .send(`latitude=${latitude}&longitude=${longitude}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(200);
    expect(response.text).toBe("no state found");
})

test('POST / with only longitude provided should return an error', async () => {
    const longitude = '-77.036133';

    const response = await request.post('/')
        .send(`longitude=${longitude}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Coordinates missing');
});

test('POST / with only longitude provided should return an error', async () => {
    const longitude = '-77.036133';

    const response = await request.post('/')
        .send(`longitude=${longitude}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Coordinates missing');
});

test('POST / with only latitude provided should return an error', async () => {
    const latitude = '40.51379';

    const response = await request.post('/')
        .send(`latitude=${latitude}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Coordinates missing');
});

test('GET / should return 404 Not Found', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Not found');
});
