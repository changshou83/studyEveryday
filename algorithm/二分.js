var searchRange = function (nums, target) {
    if (nums.length === 0) return [-1, -1];

    const leftBorder = getBorder(nums, target, true); // 寻找target左边界，包含target
    const rightBorder = getBorder(nums, target, false) - 1; // 寻找target右边界，包含target
    console.log(leftBorder, rightBorder);

    if (leftBorder > rightBorder) return [-1, -1];
    return [leftBorder, rightBorder];
};

console.log(searchRange([1, 1, 1, 2, 1], 1));

function getBorder(nums, target, leftBorder) {
    let left = 0,
        right = nums.length - 1;
    let result = nums.length;
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (target < nums[middle] || (leftBorder && target <= nums[middle])) {
            right = middle - 1;
            result = middle;
        } else {
            left = middle + 1;
        }
    }

    return result;
}
