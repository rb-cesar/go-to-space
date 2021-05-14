const sun = document.querySelector('#sun')
const earth = document.querySelector('#earth')
const bluePlanet = document.querySelector('#blue-planet')
const astronaut = document.querySelector('#astronaut')
// const fixedTitle = document.querySelector('.fixed-title')


function generateRandomValues() {
  const animationDuration = Math.random() * 5
  const size = Math.random() * 3
  const x = Math.random() * (innerWidth - size)
  const y = Math.random() * (innerHeight - size)

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
    count = 70
  }

  while (i < count) {
    star = createStar()
    document.body.appendChild(star)
    i++
  }
}

function parallaxEffect() {
  const { scrollTop } = document.documentElement
  
  if (window.innerWidth <= 600) {
    
    earth.style.top = `${30 + (scrollTop * 0.03)}%`
    bluePlanet.style.top = `${20 + (scrollTop * 0.05)}%`
    
  } else {
    
    earth.style.top = `${40 + (scrollTop * 0.02)}%`
    bluePlanet.style.top = `${30 + (scrollTop * 0.04)}%`
    
  }
  
  astronaut.style.transform = `rotateZ(-${scrollTop * 0.2}deg)`
  astronaut.style.left = `${10 + (scrollTop * 0.03)}%`
  astronaut.style.bottom = `${20 - (scrollTop * 0.01)}%`
  
  sun.style.top = `${scrollTop * 0.7}px`
}

window.addEventListener('scroll', parallaxEffect)
window.addEventListener('load', insertStarsInToDOM)
