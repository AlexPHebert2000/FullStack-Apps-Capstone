import {beforeAll, expect, test, afterAll} from 'vitest';
import * as db from '../database/index.js';
import { fsAdapter } from '../database/fsAdapter.js';
import fs from 'fs/promises';

const FILE_LOCATION = "./src/server/tests/dbFiles/"

let testID;

beforeAll(async () => {
  db.useAdapter(new fsAdapter(["test"], FILE_LOCATION));
  await db.boot();
});


test('file should be created for each table', async () => {
  const fileList = await fs.readdir(FILE_LOCATION);
  expect(fileList.includes("test.txt")).toBe(true);
});

test('insertOne', async () => {
  const newData = await db.insertOne('test', {value: "test"});
  testID = newData.id
  const rawDocData = await fs.readFile(FILE_LOCATION + "test.txt");
  const docData = JSON.parse(rawDocData);
  expect(docData.some(val => val.id === testID)).toBe(true);
});

test('findOne', async () => {
  const {id} = await db.findOne('test', (val => val.id === testID));
  expect(id).toEqual(testID);
});

test('updateOne', async () => {
  await db.updateOne('test', testID, {value: "updated"});
  const {value} = await db.findOne('test', (val) => val.id === testID);
  expect(value).toEqual("updated")
});

test('deleteOne', async () => {
  await db.deleteOne('test', testID);
  const data = await db.findOne('test', (val) => val.id === testID);
  expect(data).toBe(null)
})

afterAll(async () => {
  await fs.unlink(FILE_LOCATION + "test.txt");
})