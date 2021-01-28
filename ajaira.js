let details = [{ foodId: 1 }, { foodId: 2 }, { foodId: 3 }, { foodId: 4 }]
const foodIds = [2, 3]

details.forEach((item) => {
  const food = foodIds.includes(item.foodId)
  console.log(food)
  if (!food) details = details.filter((detail) => detail.foodId !== item.foodId)
  else item.food = food
})

console.log(details)
