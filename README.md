# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Links

- Solution URL: [View Code](https://github.com/Gskds/time-tracking-dashboard.git)
- Live Site URL: [Live Site](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

One of the challenge I encountered while doing this challenge is that positioning the timeframe-serector section behind the report section using the (position: relative, z-index: -1) css declaration while keep the functionality of the buttons inside it. But this declaration make the buttons unclickable. 

So I use position: absolute instead of position relative this brings back the functionality of the buttons but it created a layout issue. 

So I ask deepseek why is this happen specially for position relative problem and a get finally the answer why the buttons aren't work. Here is why `position: relative` and `z-index: -1` make the timeframe-selector section behind the parent element due to this we won't be able to click the buttons. 

Then I ask it what possible alternative should I take to make the buttons functional while while keep the staking behavior intact. It gives the following 3 options.

**Option 1. Reparenting the buttons**

```css
.profile {
  position: relative;
  /* other styles */
}

.timeframe-selector {
  background: var(--clr-navy-900);
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: 10px;
  position: relative;
  z-index: -1;
}

/* Create a new container just for the buttons that sits on top */
.timeframe-buttons {
  position: absolute;
  bottom: 1.5rem; /* Match the padding */
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 2rem;
  z-index: 1; /* Bring buttons to front */
}

.timeframe-btn {
  background: none;
  border: none;
  color: var(--clr-primary-400);
  cursor: pointer;
  /* Add other button styles */
}

.timeframe-btn.color {
  color: white;
}
```

```html
<section class="profile">
  <div class="report" aria-label="User report">
    <img class="profile-picture" src="/images/image-jeremy.png" alt="Jeremy's profile picture">
    <div class="report__meta">
      <p class="report__lable">Report for</p>
      <h1>Jeremy Robson</h1>
    </div>
  </div>
  
  <div class="timeframe-selector">
    <!-- Background only -->
  </div>
  
  <div class="timeframe-buttons">
    <button class="timeframe-btn" data-timeframe="daily" id="daily">Daily</button>
    <button class="timeframe-btn" data-timeframe="weekly" id="weekly">Weekly</button>
    <button class="timeframe-btn" data-timeframe="monthly" id="monthly">Monthly</button>
  </div>
</section>
```
**Option 2. Using Pseudo-element for background**

```css
class.profile {
  position: relative;
  display: flex;
  flex-direction: column;
}

.report {
  /* Your report styles */
  position: relative; /* Ensure it stays above */
  z-index: 1;
}

.timeframe-selector {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: 10px;
  position: relative;
  /* No background here */
}

.timeframe-selector::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--clr-navy-900);
  border-radius: 10px;
  z-index: -1; /* Background only goes behind */
}

.timeframe-btn {
  background: none;
  border: none;
  color: var(--clr-primary-400);
  cursor: pointer;
  position: relative; /* Ensure buttons are clickable */
  z-index: 1;
}

.timeframe-btn.color {
  color: white;
}
```

```html
<section class="profile">
  <div class="report" aria-label="User report">
    <img class="profile-picture" src="/images/image-jeremy.png" alt="Jeremy's profile picture">
    <div class="report__meta">
      <p class="report__lable">Report for</p>
      <h1>Jeremy Robson</h1>
    </div>
  </div>
  
  <div class="timeframe-selector">
    <button class="timeframe-btn" data-timeframe="daily" id="daily">Daily</button>
    <button class="timeframe-btn" data-timeframe="weekly" id="weekly">Weekly</button>
    <button class="timeframe-btn" data-timeframe="monthly" id="monthly">Monthly</button>
  </div>
</section>
```

**Option 3. Adjusting JavaScript EventListener**

```css
.profile {
  position: relative;
}

.timeframe-selector {
  background: var(--clr-navy-900);
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: 10px;
  position: relative;
  z-index: -1;
}

/* Ensure buttons are visually on top */
.timeframe-btn {
  position: relative;
  z-index: 1;
  background: none;
  border: none;
  color: var(--clr-primary-400);
  cursor: pointer;
}
```

```javascript
// Instead of attaching to each button, use event delegation
document.querySelector('.profile').addEventListener('click', function(e) {
  if (e.target.classList.contains('timeframe-btn')) {
    const timeframe = e.target.dataset.timeframe;
    updateTimeframe(timeframe);
    
    // Update colors
    timeframeButton.forEach(btn => btn.classList.remove('color'));
    e.target.classList.add('color');
  }
});
```

I choice option 2 and here's how it works
```css
.timeframe-selector::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--clr-navy-900);
  border-radius: 10px;
  z-index: -1; /* Background only goes behind */
}
```
blocks of code make sure the background color of timeframe-selector section goes behind the report section so this fix our layout issue.

the `position: relative` declaration on timeframe-selector make sure the pseudo-element positioned reltive to it.

And finally the `position: relative` and `z-index: 1` on timeframe-btn class make sure buttons stays ontop of the timeframe-selector section.

I don't use option 1 and 3 for the following reasons:
- option 1 changes the structure of may HTML document I don't want since I pretty happy with may structure.
- Option 3 uses JavaScript to fix this I didn't use this because the main problem I faced is a layout issue(the functionality of the buttons brock because of layout issue).

## Author

- Frontend Mentor - [@Gskds](https://www.frontendmentor.io/profile/Gskds)
