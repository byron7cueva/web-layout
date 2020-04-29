'use strict'

function addSentinels (container, className) {
  return Array.from(container.querySelectorAll('.sticky')).map( ele => {
    const sentinel = document.createElement('div')
    sentinel.classList.add('sticky__sentinel', className)
    return ele.closest('.item').appendChild(sentinel)
  })
}

function observeHeaders (container) {
  const observer = new IntersectionObserver((records, observer) => {
    for (const record of records) {
      const {boundingClientRect, rootBounds} = record
      const stickyTarget = record.target.parentElement.querySelector('.sticky')
      
      if (boundingClientRect.bottom < rootBounds.top) {
        fire(true, stickyTarget)
      }
      
      if (boundingClientRect.bottom >= rootBounds.top &&
        boundingClientRect.bottom < rootBounds.bottom) {
          fire(false, stickyTarget)
        }
    }
  }, {
    threshold: [0]
  })

  const sentinels = addSentinels(container, 'sticky__sentinel--top')
  sentinels.forEach(ele => observer.observe(ele))
}

function observeFooters (container) {
  const observer = new IntersectionObserver((records, observer) => {
    for (const record of records) {
      const {rootBounds, intersectionRatio, boundingClientRect} = record
      const stickyTarget = record.target.parentElement.querySelector('.sticky')

      if (boundingClientRect.bottom > rootBounds.top && intersectionRatio === 1) {
        fire(true, stickyTarget)
      }

      if (boundingClientRect.top < rootBounds.top &&
        boundingClientRect.bottom < rootBounds.bottom) {
          fire(false, stickyTarget)
      }
    }
  }, {
    threshold: [1]
  })

  const sentinels = addSentinels(container, 'sticky__sentinel--bottom')
  sentinels.forEach(ele => observer.observe(ele))
}

function fire (stuck, target) {
  const event = new CustomEvent('sticky-change', {detail: {stuck, target}})
  document.dispatchEvent(event)
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#container')
  observeHeaders(container)
  observeFooters(container)

  document.addEventListener('sticky-change', event => {
    const {target, stuck} = event.detail;
    target.classList.toggle('shadow', stuck);
  })
})