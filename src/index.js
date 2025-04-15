
import { cube } from './math.js';
import { add} from '@mia789456/child'
import { isArray } from 'lodash'
console.log('start index.js')
cube(5)
// add(1,2)

console.log(isArray([1,2,3]))

import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('app')).render(
  <App />
)








