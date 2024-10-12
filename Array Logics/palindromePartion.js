function partition(s) {
    const result = [];
    
    const isPalindrome = (str, left, right) => {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    };

    const backtrack = (start, currentPartition) => {
        if (start === s.length) {
            result.push([...currentPartition]);
            return;
        }

        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                currentPartition.push(s.substring(start, end + 1));
                backtrack(end + 1, currentPartition);
                currentPartition.pop();
            }
        }
    };

    backtrack(0, []);
    return result;
}

console.log(partition("aab"));  
