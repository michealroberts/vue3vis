/**
 * @jest-environment jsdom
 */
 import { describe, expect, it } from 'vitest'

import { useTimeline } from '../../'
 
 describe('useTimeline', () => {
   it('should be defined', () => {
     expect(useTimeline).toBeDefined()
   })
 })