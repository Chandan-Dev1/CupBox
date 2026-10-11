function getCapacity(cup, box) {
  const cupDimensions = [cup.diameter, cup.diameter, cup.height];
  const boxDimensions = [box.length, box.width, box.height];
  const orientations = [
    [0, 1, 2], [0, 2, 1], [1, 0, 2],
    [1, 2, 0], [2, 0, 1], [2, 1, 0]
  ];

  let bestCapacity = 0;
  let bestArrangement = null;

  for (const orientation of orientations) {
    const countX = Math.floor(boxDimensions[0] / cupDimensions[orientation[0]]);
    const countY = Math.floor(boxDimensions[1] / cupDimensions[orientation[1]]);
    const countZ = Math.floor(boxDimensions[2] / cupDimensions[orientation[2]]);
    const capacity = countX * countY * countZ;

    if (capacity > bestCapacity) {
      bestCapacity = capacity;
      bestArrangement = { countX, countY, countZ };
    }
  }

  return { capacity: bestCapacity, arrangement: bestArrangement };
}

export function calculateCapacity(cup, box) {
  const result = getCapacity(cup, box);
  return { boxId: box._id, boxName: box.name, capacity: result.capacity, arrangement: result.arrangement };
}

export function recommendBoxes(cup, boxes, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) throw new Error("Quantity must be a positive integer");

  const results = boxes.map((box) => {
    const { capacity, arrangement } = getCapacity(cup, box);
    if (capacity <= 0) return null;
    const requiredBoxes = Math.ceil(quantity / capacity);
    return {
      boxId: box._id, boxName: box.name, capacity, arrangement,
      requiredBoxes, availableStock: box.stock,
      canFulfill: box.stock >= requiredBoxes,
      totalCost: requiredBoxes * box.price
    };
  }).filter(Boolean);

  return {
    recommendations: results.filter((box) => box.canFulfill)
      .sort((a, b) => a.requiredBoxes - b.requiredBoxes || a.totalCost - b.totalCost),
    unavailableOptions: results.filter((box) => !box.canFulfill)
  };
}
