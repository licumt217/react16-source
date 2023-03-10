/**
 * 001
 * 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，
 * 并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 * 
 * 用Map，不用两层循环
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.get(target - nums[i]) !== undefined) {
            return [i, map.get(target - nums[i])]
        } else {
            map.set(nums[i], i);
        }
    }
};

/**
 * 002
 * 有效的括号 【栈，后进先出】
 * 
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 每个右括号都有一个对应的相同类型的左括号。
 * 
 * 左括号推入栈中，右括号必须一次匹配。类似vue源码中，字符串标签解析时，匹配收尾标签那里的逻辑。
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {

    let arr = s.split("");

    let leftArr = [];

    function isLeft(str) {
        return '({['.includes(str)
    }

    function isRight(str) {
        return ']})'.includes(str)
    }

    function getReverse(str) {
        switch (str) {
            case '}':
                return '{';
            case ']':
                return '[';
            case ')':
                return '(';
        }
    }
    let cur;
    for (let i = 0, len = arr.length; i < len; i++) {
        cur = arr[i]
        if (isLeft(cur)) {
            leftArr.push(cur)
        } else {
            if (leftArr[leftArr.length - 1] !== getReverse(cur)) {
                return false;
            } else {
                leftArr.pop();
            }
        }
    }
    return leftArr.length === 0;
};

/**
 * 003
 * 不同路径（动态规划）
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
 * 问总共有多少条不同的路径？
 * 
 * 动态规划。dp[i][j]=dp[i-1][j]+dp[i][j-1]
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {

    let dp = new Array(m).fill(new Array(n));

    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }

    return dp[m - 1][n - 1];
};


/**
 * 004
 * 爬楼梯 【动态规划】
 * 
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 
 * dp[i] = dp[i - 1] + dp[i - 2];
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    let dp = new Array(n);
    dp[0] = 1;
    dp[1] = 2;
    for (let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n - 1]
};


/**
 * 005
 * 买卖股票的最佳时机
 * 
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 * 
 * 动态计算最低价格和最高利润
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let minPrice = Number.MAX_VALUE;
    let profit = 0;
    let curP;
    for (let i = 0, len = prices.length; i < len; i++) {
        curP = prices[i]
        if (curP < minPrice) {
            minPrice = curP;
        } else {
            profit = Math.max(curP - minPrice, profit);
        }
    }
    return profit;
};

/**
 * 006
 * 只出现一次的数字 [ 异或操作符 ^= ]
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 * 
 * 1、任何数和 0 做异或运算，结果仍然是原来的数
 * 2、任何数和其自身做异或运算，结果是 0
 * 3、异或运算满足交换律和结合律
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let single = 0;
    for (let num of nums) {
        single ^= num;
    }
    return single;
};

/**
 * 007
 * 多数元素 
 * 
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * 
 * 1、哈希表
 * 2、排序：
 *      如果将数组 nums 中的所有元素按照单调递增或单调递减的顺序排序，
 *      那么下标为 n/2 的元素（下标从 0 开始）一定是众数。
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    nums.sort();
    let middle = Math.floor(nums.length / 2)
    return nums[middle]
};

/**
 * 008
 * 移动零 [双指针]
 * 
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 * 
 * 使用双指针，左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部。
 * 右指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移
 * 左指针左边均为非零数；
 * 右指针左边直到左指针处均为零
 * 因此每次交换，都是将左指针的零与右指针的非零数交换，且非零数的相对顺序并未改变
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {

    let len = nums.length, left = 0, right = 0;

    while (right < len) {
        if (nums[right] !== 0) {
            swap(nums, left, right);
            left++;
        }
        right++;
    }

    function swap(nums, left, right) {
        let temp = nums[left];
        nums[left] = nums[right]
        nums[right] = temp;
    }
};

/**
 * 009 - 01
 * 比特位计数 【 位运算 & 】
 * 
 * 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，
 * 计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。
 * 
 * Brian Kernighan 算法：对于任意整数 x，令 x=x & (x−1)，
 * 该运算将 x 的二进制表示的最后一个 1 变成 0。因此，对 x 重复该操作，直到 x 变成 0，
 * 则操作次数即为 x 的多少「一比特数」
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
    let arr = new Array(n + 1).fill(0);

    for (let i = 0; i <= n; i++) {
        arr[i] = countBits(i);
    }
    function countBits(num) {
        let counts = 0;
        while (num > 0) {
            num &= (num - 1)
            counts++;
        }
        return counts;
    }

    return arr;
};

/**
 * 009 - 02
 * 比特位计数 【 动态规划，最高有效位 】
 * 有个前提原则：一个正整数 i 的二进制表示中 1 的总数 = 1 + （i-highBit)的1的总数。highBit代表i的最高有效位，是一个数字
 * 
 * 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，
 * 计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。
 * 
 * 当计算 i 的「一比特数」时，如果存在 0≤j<i , j 的「一比特数」已知，且i 和 j 相比，
 * i 的二进制表示只多了一个 1，则可以快速得到 i 的「一比特数」。
 * 令 bits[i] 表示 i 的「一比特数」，则上述关系可以表示成：bits[i]=bits[j]+1。
 * 
 * 对于正整数 x，如果可以知道最大的正整数 y，使得 y≤x 且 y 是 2 的整数次幂
 * ，则 y 的二进制表示中只有最高位是 1，其余都是 0，此时称 y 为 x 的「最高有效位」。
 * 令 z=x−y , 显然 0≤z<x ，则 bits[x]=bits[z]+1。
 * 
 * 为了判断一个正整数是不是 2 的整数次幂，可以利用方法一中提到的按位与运算的性质。
 * 如果正整数 y 是 2 的整数次幂，则 y 的二进制表示中只有最高位是 1，其余都是 0，
 * 因此 y & (y−1)=0。由此可见，正整数 y 是22 的整数次幂，
 * 当且仅当 y & (y−1)=0。
 * 
 * 显然，0 的「一比特数」为 0。使用 highBit表示当前的最高有效位，
 * 遍历从 1 到 n 的每个正整数 i，进行如下操作:
 *      >如果 i & (i−1)=0, 则令 highBit=i，更新当前的最高有效位
 *      >i 比 i−highBit 的「一比特数」多 1，由于是从小到大遍历每个整数，因此遍历到 i 时，
 *      >i−highBit 的「一比特数」已知，令 bits[i]=bits[i−highBit]+1。
 * 最终得到的数组 bits\textit{bits}bits 即为答案
 * 
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
    let bits = new Array(n + 1).fill(0);

    let highBit = 0;

    for (let i = 1; i <= n; i++) {
        if ((i & (i - 1)) === 0) {//满足此条件，说明i是 2 的整数次幂；更新最高位
            highBit = i;
        }
        bits[i] = bits[i - highBit] + 1;
    }
    return bits;
};

/**
 * 010
 * 找到所有数组中消失的数字 [原地修改，自身数组充当哈希表，数组下标指向对应的数值]
 * 
 * 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。
 * 请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
 * 
 * 由于 nums 的数字范围均在 [1,n] 中，
 * 我们可以利用这一范围之外的数字，来表达「是否存在」的含义
 * 
 * 具体来说，遍历 nums，每遇到一个数 x，就让 nums[x−1] 增加 n。由于 nums 中所有数均
 * 在 [1,n]中，增加以后，这些数必然大于 n。最后我们遍历 nums，若 nums[i]未大于 n，就
 * 说明没有遇到过数 i+1。这样我们就找到了缺失的数字。
 * 
 * 注意，当我们遍历到某个位置时，其中的数可能已经被增加过，因此需要对 n 取模来还原出它本来的值。
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
    const n = nums.length;
    for (const num of nums) {
        const x = (num - 1) % n;
        nums[x] += n;
    }

    const result = [];
    for (const [i, num] of nums.entries()) {
        if (num <= n) {
            result.push(i + 1)
        }
    }
    return result;

};

/**
 * 011
 * 汉明距离 【位运算 异或 ^】
 * 
 * 两个整数之间的 汉明距离 指的是这两个数字对应二进制位不同的位置的数目。
 * 给你两个整数 x 和 y，计算并返回它们之间的汉明距离
 * 
 * 根据以上定义，我们使用异或^运算，记为 ⊕，当且仅当输入位不同时输出为 1。
 * 计算 x 和 y 之间的汉明距离，可以先计算 x⊕y，然后统计结果中等于 1 的位数
 * 现在，原始问题转换为位计数问题 
 * Brian Kernighan 算法 [ x & (x−1) ],知道结果等于0。计算次数就是1出现的数目。
 * 
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
    let z = x ^ y, count = 0;
    while (z !== 0) {
        z &= (z - 1);
        count++;
    }
    return count;
};