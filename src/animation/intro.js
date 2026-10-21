import { randomAt } from './particles.js';

function lettersFor(text, className = '') {
  const wrapper = document.createElement('span');
  wrapper.className = className;
  for (const character of text) {
    const letter = document.createElement('span');
    letter.className = 'intro__letter';
    letter.textContent = character === ' ' ? '\u00a0' : character;
    wrapper.append(letter);
  }
  return wrapper;
}

export class IntroSequence {
  constructor(elements, content, options, portrait) {
    this.elements = elements;
    this.content = content;
    this.options = options;
    this.portrait = portrait;
    this.animations = [];
    this.timers = [];
    this.playing = false;
    elements.name.replaceChildren(...content.identity.introLines.map(line => lettersFor(line, 'intro__name-line')));
    this.titleWord = lettersFor(elements.heroTitle.textContent, 'intro__title-word');
    elements.title.replaceChildren(this.titleWord);
  }

  animate(element, keyframes, timing) {
    const animation = element.animate(keyframes, { fill: 'both', easing: this.options.easing.out, ...timing });
    animation.finished.catch(() => {});
    this.animations.push(animation);
    return animation;
  }

  after(delay, callback) { this.timers.push(setTimeout(callback, delay)); }

  play({ reducedMotion = false } = {}) {
    this.cancel();
    if (reducedMotion || typeof Element.prototype.animate !== 'function') { this.finish(); return; }
    this.playing = true;
    const { intro, name, punctuation, dot, bar, title, skip, chrome } = this.elements;
    const timing = this.options.intro;
    intro.hidden = false;
    skip.hidden = false;
    chrome.forEach(element => { element.inert = true; });
    document.body.classList.add('is-playing');
    document.body.dataset.introState = 'playing';
    this.portrait?.hide();

    this.animate(dot, [
      { transform: 'translateY(-130px)', opacity: 0 },
      { transform: 'translateY(8px)', opacity: 1, offset: .72 },
      { transform: 'translateY(0)', opacity: 1 },
    ], { duration: timing.dotDuration });
    this.animate(bar, [
      { opacity: 0, transform: 'translateY(14px) rotateX(82deg)' },
      { opacity: 1, transform: 'translateY(0) rotateX(0)' },
    ], { delay: timing.barDelay, duration: timing.barDuration });
    this.animate(punctuation, [
      { opacity: 1 }, { opacity: 0, transform: 'translateY(30px) rotateZ(16deg)' },
    ], { delay: timing.punctuationExit, duration: 330 });

    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2 + 25;
    name.querySelectorAll('.intro__letter').forEach((letter, index) => {
      const rect = letter.getBoundingClientRect();
      const x = centerX - rect.left - rect.width / 2;
      const y = centerY - rect.top - rect.height / 2;
      const rotation = (randomAt(index) - .5) * 110;
      this.animate(letter, [
        { opacity: 0, transform: `translate3d(${x}px, ${y}px, -80px) rotateZ(${rotation}deg) rotateX(75deg)` },
        { opacity: 1, transform: `translate3d(0, -4px, 0) rotateZ(${-rotation * .04}deg) rotateX(0)`, offset: .78 },
        { opacity: 1, transform: 'translate3d(0, 0, 0) rotateZ(0) rotateX(0)' },
      ], { delay: timing.nameDelay + index * timing.nameStagger, duration: timing.letterDuration });
    });
    this.animate(name, [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-32px) scale(.97)' },
    ], { delay: timing.nameExit, duration: 350 });

    title.querySelectorAll('.intro__letter').forEach((letter, index) => {
      this.animate(letter, [
        { opacity: 0, transform: `translate3d(${(randomAt(index + 61) - .5) * 140}px, 72px, -90px) rotateX(90deg) rotateZ(${(randomAt(index + 31) - .5) * 35}deg)` },
        { opacity: 1, transform: 'translate3d(0, 0, 0) rotateX(0) rotateZ(0)' },
      ], { delay: timing.titleDelay + index * timing.titleStagger, duration: timing.titleDuration });
    });

    this.after(timing.portraitDelay, () => this.portrait?.reveal());
    this.after(timing.handoffDelay, () => {
      const source = this.titleWord.getBoundingClientRect();
      const target = this.elements.heroTitle.getBoundingClientRect();
      const x = target.left + target.width / 2 - source.left - source.width / 2;
      const y = target.top + target.height / 2 - source.top - source.height / 2;
      this.animate(this.titleWord, [
        { transform: 'translate3d(0, 0, 0) scale(1)' },
        { transform: `translate3d(${x}px, ${y}px, 0) scale(${target.width / source.width})` },
      ], { duration: timing.handoffDuration, easing: this.options.easing.inOut });
    });
    this.after(timing.completeDelay, () => this.finish({ preserveFormation: true }));
  }

  finish({ preserveFormation = false } = {}) {
    const shouldRestoreFocus = document.activeElement === this.elements.skip;
    this.cancel();
    this.playing = false;
    this.elements.intro.hidden = true;
    this.elements.skip.hidden = true;
    this.elements.chrome.forEach(element => { element.inert = false; });
    document.body.classList.remove('is-playing');
    document.body.dataset.introState = 'complete';
    if (!preserveFormation) this.portrait?.reveal({ immediate: true });
    this.elements.status.textContent = `${this.content.labels.finished} ${this.content.identity.fullName}.`;
    if (shouldRestoreFocus) this.elements.focusTarget.focus({ preventScroll: true });
  }

  cancel() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.animations.forEach(animation => animation.cancel());
    this.animations = [];
  }

  destroy() { this.cancel(); }
}
