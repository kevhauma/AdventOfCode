/*
Part one
*/

const fs = require('fs')

const input = fs.readFileSync('./day1/input.txt',  {encoding:'utf8'})
const calorieItems = input.split(/\r?\n/g)

const calorieTotals = []
let tempCalGroup = []
calorieItems.forEach(cal=>{
    //if empty line, count up gathered calories and push em in the other array
    //clear out gathered calories while we're here
if(!cal){
    const totalCalorieCount = tempCalGroup.reduce((total,current)=>total+current)
    calorieTotals.push(totalCalorieCount)    
    tempCalGroup = []
}
else
    tempCalGroup.push(parseInt(cal))
})

const maxCalorieCount = Math.max(...calorieTotals)
console.log(maxCalorieCount)

/*
Part two
*/

const top3 = calorieTotals.sort((a,b)=>b-a).slice(0,3).reduce((total,current)=>total+current)
console.log(top3)