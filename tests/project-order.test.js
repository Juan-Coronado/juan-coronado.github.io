import test from 'node:test';
import assert from 'node:assert/strict';
import { sortProjectsByDifficulty, projectDifficulty } from '../src/sections/project-order.js';

const levels = [{ id: 'initial', label: 'Inicial' }, { id: 'intermediate', label: 'Intermedia' }, { id: 'advanced', label: 'Avanzada' }];

test('catalog orders by configured difficulty without changing the source carousel order', () => {
  const projects = Object.freeze([
    Object.freeze({ id: 'a', difficulty: 'advanced' }),
    Object.freeze({ id: 'b', difficulty: 'initial' }),
    Object.freeze({ id: 'c', difficulty: 'intermediate' }),
  ]);
  assert.deepEqual(sortProjectsByDifficulty(projects, levels).map(item => item.id), ['b', 'c', 'a']);
  assert.deepEqual(projects.map(item => item.id), ['a', 'b', 'c']);
});

test('unknown and missing difficulties follow known ones, retaining stable order for ties', () => {
  const projects = [{ id: 'u', difficulty: 'other' }, { id: 'a', difficulty: 'advanced' }, { id: 'm' }, { id: 'b', difficulty: 'advanced' }];
  assert.deepEqual(sortProjectsByDifficulty(projects, levels).map(item => item.id), ['a', 'b', 'u', 'm']);
});

test('difficulty scale can change and an empty catalog remains empty', () => {
  const projects = [{ id: 'a', difficulty: 'advanced' }, { id: 'b', difficulty: 'initial' }];
  assert.deepEqual(sortProjectsByDifficulty(projects, [...levels].reverse()).map(item => item.id), ['a', 'b']);
  assert.deepEqual(sortProjectsByDifficulty([], levels), []);
  assert.equal(projectDifficulty({}, { difficultyLevels: levels, unknownDifficulty: 'Por clasificar' }), 'Por clasificar');
});
