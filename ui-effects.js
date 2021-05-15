const sun = document.querySelector('#sun')
const earth = document.querySelector('#earth')
const bluePlanet = document.querySelector('#blue-planet')
const astronaut = document.querySelector('#astronaut')
const stars = document.querySelector('.stars')


function generateRandomValues() {
  const animationDuration = Math.random() * 5
  const size = Math.random() * 3
  const x = Math.random() * (window.innerWidth - size)
  const y = Math.random() * (window.innerHeight - size)

  return { animationDuration, size, x, y }
}

function createStar() {
  const star = document.createElement('span')
  const { animationDuration, size, x, y } = generateRandomValues()

  star.setAttribute('class', 'star')
  star.style.top = `${y}px`
  star.style.left = `${x}px`
  star.style.width = `${size}px`
  star.style.height = `${size}px`
  star.style.animationDuration = `${animationDuration}s`

  return star;
}

function insertStarsInToDOM() {
  let star
  let i = 0
  let count = 200
  
  if (window.innerWidth <= 600) {
    count = 55
  }

  while (i < count) {
    star = createStar()
    stars.appendChild(star)
    i++
  }
}

function parallaxEffect(element, styles) {
  const { scrollTop } = document.documentElement
  const stylesAsArray = Object.entries(styles)
  
  const css = stylesAsArray.map(([attr, value]) => {
    const regex = /[\|]+(.+)[\|]/
    const replacer = (_, cssRules) => `calc(${cssRules})`
  
    return `${attr}: ${value}`.replace(regex, replacer)
  })
  
  element.style = css.join(';').replace(/innerY/g, scrollTop)
}

function applyParallaxEffect(stylesRule) {
  for (let position in stylesRule) {
    const css = stylesRule[position]
    parallaxEffect(css.element, css.style)
  }
}

function handleStyles() {
  const condition = window.innerWidth <= 600
  
  const stylesRule = [
    {
      element: stars, 
      style: {top: '|innerY * 1px|'}
    },
    {
      element: sun, 
      style: {top: '|innerY * 0.8px|'}
    },
    {
      element: earth,
      style: condition ? 
        {top: '|30% + innerY * 0.3px|'} :
        {top: '|40% + innerY * 0.2px|'}
    },
    {
      element: bluePlanet,
      style: condition ?
        {top: '|20% + innerY * 0.5px|'} :
        {top: '|30% + innerY * 0.4px|'}
    },
    {
      element: astronaut,
      style: {
        transform: 'rotateZ(|innerY * (-0.3deg)|)',
        left: '|10% + innerY * 0.2px|',
        bottom: '|20% - innerY * 0.05px|'
      }
    }
  ]
  
  applyParallaxEffect(stylesRule)
}

window.addEventListener('scroll', handleStyles)
window.addEventListener('load', insertStarsInToDOM)
