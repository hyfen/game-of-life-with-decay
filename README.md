Implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) but instead of dying right away, cells decay slowly into the background.

## Examples

### Live cells in red

![grayscale](/doc/red.gif)

```javascript
const decay = 0.02;
const colourAlive = '#f41';
const colourDead = '#ccc';
```

### Graysscale

![grayscale](/doc/white.gif)

```javascript
const decay = 0.01;
const colourAlive = '#fff';
const colourDead = '#ddd';
```
