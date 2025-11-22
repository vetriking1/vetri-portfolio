# Implementation Plan

- [-] 1. Create performance optimization hooks


- [-] 1.1 Create useReducedMotion hook




  - Implement hook that detects prefers-reduced-motion media query
  - Add reactive listener for media query changes
  - Return boolean indicating reduced motion preference
  - _Requirements: 8.1, 8.2_

- [ ] 1.2 Write property test for useReducedMotion hook





  - **Property 19: useReducedMotion reactivity**
  - **Validates: Requirements 8.1, 8.2**


- [x] 1.3 Create useTouchDevice hook





  - Implement hook that detects touch capability
  - Check 'ontouchstart' in window or navigator.maxTouchPoints
  - Return boolean indicating touch device
  - _Requirements: 1.2, 3.4_


- [ ] 1.4 Write property test for useTouchDevice hook



  - **Property 1: Touch device cursor exclusion**
  - **Validates: Requirements 1.2, 3.4**



- [-] 1.5 Create useViewportSize hook




  - Implement hook that caches viewport dimensions
  - Update only on window resize events (debounced)
  - Return { width, height } object
  - _Requirements: 4.2_

- [ ] 1.6 Write property test for useViewportSize hook







  - **Property 9: Viewport dimensions caching**
  - **Validates: Requirements 4.2**

- [x] 1.7 Create useDebounce hook



  - Implement generic debounce hook with configurable delay
  - Use setTimeout to delay value updates
  - Clear previous timeout on new value
  - _Requirements: 3.1_








- [ ] 1.8 Write property test for useDebounce hook






  - **Property 8: CustomCursor debouncing rate limit**



  - **Validates: Requirements 3.1**


- [ ] 2. Optimize CustomCursor component


- [ ] 2.1 Add conditional rendering for touch devices


  - Import useTouchDevice hook
  - Return null if isTouchDevice is true
  - Keep existing rendering logic for non-touch devices
  - _Requirements: 1.2, 3.4_

- [ ] 2.2 Implement debounced mouse position updates



  - Import useDebounce hook



  - Debounce mousePosition state with 16ms delay

  - Update mousemove event handler to use debounced value
  - _Requirements: 3.1_



- [ ] 2.3 Replace Framer Motion position with CSS transforms

  - Remove Framer Motion animate prop for position
  - Apply position via inline style.transform
  - Keep Framer Motion only for scale animation on hover


  - _Requirements: 3.2_

- [ ] 2.4 Reduce spring animation stiffness

  - Change stiffness from 500 to 150 in transition config


  - Adjust damping if needed for smooth animation
  - _Requirements: 3.3_

- [ ] 2.5 Write property tests for CustomCursor optimizations





  - **Property 1: Touch device cursor exclusion**
  - **Property 8: CustomCursor debouncing rate limit**
  - **Validates: Requirements 1.2, 3.1, 3.4**

- [ ] 3. Optimize FloatingElements component

- [ ] 3.1 Reduce icon count to maximum 3

  - Slice icons array to first 3 elements
  - Make maxIcons configurable via props (default 3)
  - _Requirements: 1.3, 4.1_





- [ ] 3.2 Replace window dimensions with useViewportSize hook

  - Import useViewportSize hook
  - Use cached dimensions instead of window.innerWidth/innerHeight

  - Remove direct window access from animation calculations

  - _Requirements: 4.2_

- [ ] 3.3 Convert Framer Motion animations to CSS keyframes



  - Define CSS keyframes for floating animation
  - Replace motion.div with regular div + CSS classes
  - Apply animation-duration and animation-delay via inline styles
  - _Requirements: 4.3_



- [ ] 3.4 Add reduced motion support

  - Import useReducedMotion hook
  - Render static icons without animation when reduced motion enabled


  - Remove animation classes when prefersReducedMotion is true
  - _Requirements: 4.4_

- [ ] 3.5 Add will-change property to CSS





  - Add will-change: transform, opacity to animated icons
  - Ensure will-change is scoped to animation duration
  - _Requirements: 4.3_

- [ ] 3.6 Write property tests for FloatingElements optimizations





  - **Property 3: Floating elements count limitation**
  - **Property 9: Viewport dimensions caching**
  - **Property 10: Reduced motion static icons**


  - **Validates: Requirements 1.3, 4.1, 4.2, 4.4**

- [ ] 4. Optimize LoadingScreen component


- [ ] 4.1 Replace setInterval with requestAnimationFrame

  - Remove setInterval for progress updates
  - Implement RAF loop with elapsed time calculation
  - Calculate progress based on time elapsed vs total duration
  - _Requirements: 6.1_

- [ ] 4.2 Reduce loading duration to 1 second

  - Change total duration from 1500ms to 1000ms
  - Adjust progress calculation accordingly
  - _Requirements: 6.2_


- [ ] 4.3 Convert Framer Motion animations to CSS

  - Replace Framer Motion spinner with CSS animation
  - Use CSS transforms for rotation
  - Keep Framer Motion only for exit animation
  - _Requirements: 6.3_


- [-] 4.4 Add reduced motion support


  - Import useReducedMotion hook
  - Call onLoadingComplete immediately if reduced motion enabled
  - Skip all animations when prefersReducedMotion is true
  - _Requirements: 6.4_

- [ ] 4.5 Write property tests for LoadingScreen optimizations


  - **Property 14: Loading screen duration limit**
  - **Property 15: Reduced motion instant loading**
  - **Validates: Requirements 6.2, 6.4**

- [ ] 5. Optimize HeroSection component with lazy loading

- [ ] 5.1 Implement lazy loading for Spline models

  - Use React.lazy() or dynamic import for Spline component
  - Add loading state (isLoading, isLoaded)
  - Delay Spline load until after critical content renders
  - _Requirements: 5.1_

- [ ] 5.2 Add intersection observer for viewport-based loading

  - Implement useInView hook or intersection observer
  - Trigger Spline load when section is near viewport
  - Set threshold for early loading (e.g., 200px before visible)
  - _Requirements: 5.1_


- [ ] 5.3 Load only current theme model
  - Check current theme state (light or dark)
  - Load only the Spline URL corresponding to current theme
  - Remove loading of both models simultaneously
  - _Requirements: 5.2_

- [ ] 5.4 Implement model cleanup on theme change





  - Add cleanup effect when theme changes
  - Unload previous Spline model before loading new one
  - Clear any Spline-related DOM elements
  - _Requirements: 5.3_

- [ ] 5.5 Add loading placeholder



  - Create lightweight placeholder component
  - Display gradient background while loading
  - Show minimal loading indicator
  - _Requirements: 5.4_

- [ ] 5.6 Adjust Spline scale for mobile

  - Import useViewportSize hook
  - Check if viewport width < 768px
  - Apply scale-100 on mobile, keep original scale on desktop
  - _Requirements: 1.4, 5.5_



- [ ] 5.7 Add reduced motion support for typewriter


  - Import useReducedMotion hook
  - Skip typewriter effect when reduced motion enabled
  - Display full text immediately
  - _Requirements: 2.3_

- [ ]* 5.8 Write property tests for HeroSection optimizations
  - **Property 4: Mobile Spline model scaling**
  - **Property 6: Reduced motion disables typewriter effect**
  - **Property 11: Lazy loading Spline models**
  - **Property 12: Single theme model loading**
  - **Property 13: Theme switch model cleanup**
  - **Property 24: Spline container space reservation**
  - **Validates: Requirements 1.4, 2.3, 5.1, 5.2, 5.3, 5.5, 10.4**



- [-] 6. Optimize ProjectsSection component


- [ ] 6.1 Replace Framer Motion hover with CSS transforms

  - Remove whileHover prop from motion.div

  - Create CSS classes for hover effects
  - Use CSS transforms for scale, rotateY, rotateX
  - _Requirements: 7.1_

- [ ] 6.2 Implement will-change management for hover


  - Add will-change: transform on hover start
  - Remove will-change on hover end
  - Use onMouseEnter and onMouseLeave handlers
  - _Requirements: 7.2_

- [ ] 6.3 Add mobile-specific hover effects



  - Import useViewportSize hook
  - Disable 3D transforms on mobile (width < 768px)
  - Use simple scale effect on mobile
  - _Requirements: 7.3_




- [ ] 6.4 Add reduced motion support

  - Import useReducedMotion hook

  - Use opacity-only effects when reduced motion enabled

  - Disable all transform animations
  - _Requirements: 2.4, 7.4_

- [ ] 6.5 Implement intersection observer for cards

  - Use useInView hook for each card
  - Animate only when card is visible in viewport
  - Set once: true to animate only on first appearance
  - _Requirements: 7.5_

- [ ] 6.6 Optimize mobile layout


  - Ensure single column grid on mobile

  - Adjust card spacing for touch

  - Increase touch target sizes
  - _Requirements: 1.5_

- [ ]* 6.7 Write property tests for ProjectsSection optimizations
  - **Property 2: Mobile viewport layout adaptation**
  - **Property 7: Reduced motion disables 3D transforms**

  - **Property 16: Project card hover will-change scope**

  - **Property 17: Mobile disables 3D card transforms**
  - **Property 18: Intersection observer for card animations**
  - **Validates: Requirements 1.5, 2.4, 7.2, 7.3, 7.4, 7.5**

- [ ] 7. Optimize Navigation component for mobile


- [ ] 7.1 Implement mobile menu layout

  - Create hamburger menu button for mobile
  - Add slide-in drawer for navigation links
  - Show mobile menu when viewport < 768px
  - _Requirements: 9.2_



- [-] 7.2 Ensure touch target minimum dimensions



  - Set all interactive elements to min 44x44px on mobile
  - Increase padding and font size for touch

  - Add adequate spacing between touch targets

  - _Requirements: 9.1_

- [ ] 7.3 Add passive touch event listeners

  - Add { passive: true } option to touch event listeners
  - Improve scroll performance on touch devices
  - _Requirements: 9.3_


- [ ]* 7.4 Write property tests for Navigation optimizations




  - **Property 20: Touch target minimum dimensions**
  - **Property 21: Mobile navigation layout switch**
  - **Validates: Requirements 9.1, 9.2**



- [ ] 8. Optimize ContactSection component for mobile

- [ ] 8.1 Implement vertical stacking on mobile

  - Use flex-direction: column on mobile
  - Stack form elements vertically
  - Increase spacing between elements
  - _Requirements: 9.4_

- [ ] 8.2 Optimize form inputs for touch

  - Increase input padding and font size
  - Ensure inputs are touch-friendly
  - Add adequate spacing around inputs
  - _Requirements: 9.4_

- [ ]* 8.3 Write property tests for ContactSection optimizations
  - **Property 2: Mobile viewport layout adaptation**
  - **Validates: Requirements 9.4**

- [ ] 9. Implement layout shift prevention

- [ ] 9.1 Add explicit dimensions to images

  - Add width and height attributes to all img tags
  - Use aspect-ratio CSS for responsive images
  - Prevent layout shift during image loading
  - _Requirements: 10.1_

- [ ] 9.2 Reserve space for Spline models

  - Add min-height or aspect-ratio to Spline container
  - Prevent layout shift when model loads
  - Ensure consistent spacing
  - _Requirements: 10.4_

- [ ] 9.3 Audit animations for compositor properties

  - Review all animations to use only transform and opacity
  - Remove animations of width, height, top, left, margin, padding
  - Ensure GPU acceleration for all animations
  - _Requirements: 10.2_

- [ ]* 9.4 Write property tests for layout shift prevention
  - **Property 22: Explicit media dimensions**
  - **Property 23: Compositor-only animations**
  - **Property 24: Spline container space reservation**
  - **Validates: Requirements 10.1, 10.2, 10.4**

- [ ] 10. Add comprehensive reduced motion support


- [ ] 10.1 Apply reduced motion to all remaining components


  - Review AboutSection, SkillsSection, ExperienceSection
  - Add useReducedMotion hook to each
  - Disable or simplify animations when enabled
  - _Requirements: 2.1, 2.2_

- [ ] 10.2 Test reduced motion across entire application


  - Enable prefers-reduced-motion in browser
  - Verify all animations are disabled or simplified
  - Check that functionality remains intact
  - _Requirements: 2.1, 2.2_

- [ ]* 10.3 Write property tests for comprehensive reduced motion
  - **Property 5: Reduced motion disables spring animations**
  - **Validates: Requirements 2.1, 2.2**

- [ ] 11. Final mobile responsiveness pass


- [ ] 11.1 Test all sections on mobile viewports
  - Test on actual mobile devices (iOS and Android)
  - Verify layouts adapt correctly below 768px
  - Check touch interactions work properly
  - _Requirements: 1.1, 1.5_

- [ ] 11.2 Optimize mobile performance
  - Run Lighthouse audit on mobile
  - Verify performance score improvement
  - Check FCP, TTI, and CLS metrics
  - _Requirements: 1.1_

- [ ]* 11.3 Write property tests for mobile responsiveness
  - **Property 2: Mobile viewport layout adaptation**
  - **Property 3: Floating elements count limitation**
  - **Property 4: Mobile Spline model scaling**
  - **Validates: Requirements 1.1, 1.3, 1.4, 1.5**

- [ ] 12. Performance validation and testing
- [ ] 12.1 Run Lighthouse performance audits
  - Test on desktop and mobile
  - Verify performance score meets targets (85-95)
  - Check FCP < 1.5s, TTI < 3s, CLS < 0.1
  - _All requirements_

- [ ] 12.2 Test on real devices
  - Test on low-end mobile devices
  - Test on tablets
  - Test on various desktop browsers
  - Verify 55-60fps during animations
  - _All requirements_

- [ ] 12.3 Monitor for memory leaks
  - Use Chrome DevTools Memory profiler
  - Check for detached DOM nodes
  - Verify Spline models are properly cleaned up
  - _Requirements: 5.3_

- [ ]* 12.4 Run full property-based test suite
  - Execute all property tests with 100+ iterations
  - Verify all 24 correctness properties pass
  - Fix any failing properties
  - _All requirements_

- [ ] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
