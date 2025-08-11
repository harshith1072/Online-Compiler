 
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Select from "react-select";
import Footer from "./Footer";
import "../Styles/Solution.css";
import CopyToClipboard from "react-copy-to-clipboard"; // ✅ Re-added the import

// Your solutions data should be structured like this
const SOLUTIONS_DATA = [
//Jump Game II
{
  _id: "6",  
  title: "Jump Game II",
  solutions: {
    cpp: `
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int minJumps(vector<int>& nums) {
    int n = nums.size();
    if (n <= 1) {
        return 0;
    }
    int jumps = 0, currentEnd = 0, farthest = 0;
    for (int i = 0; i < n - 1; ++i) {
        farthest = max(farthest, i + nums[i]);
        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
            if (currentEnd >= n - 1) {
                break;
            }
        }
    }
    return jumps;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) {
        cin >> nums[i];
    }
    cout << minJumps(nums) << endl;
    return 0;
}
`,
    python: `
def minJumps(nums):
    n = len(nums)
    if n <= 1:
        return 0
    
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(n - 1):
        farthest = max(farthest, i + nums[i])
        if i == current_end:
            jumps += 1
            current_end = farthest
            if current_end >= n - 1:
                break
    
    return jumps

if __name__ == "__main__":
    n_str = input().strip()
    if n_str == 'NIL':
        n = 0
    else:
        n = int(n_str)
    
    if n > 0:
        nums = list(map(int, input().strip().split()))
    else:
        nums = []
        
    jumps = minJumps(nums)
    print(jumps)
`,
    java: `
import java.util.*;

public class Main {
    public static int minJumps(int[] nums) {
        int n = nums.length;
        if (n <= 1) {
            return 0;
        }

        int jumps = 0, currentEnd = 0, farthest = 0;
        for (int i = 0; i < n - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
                if (currentEnd >= n - 1) {
                    break;
                }
            }
        }
        return jumps;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        String first = sc.next();
        int n = first.equals("NIL") ? 0 : Integer.parseInt(first);

        if (n == 0) {
            System.out.println(0);
            return;
        }

        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }

        System.out.println(minJumps(a));
    }
}
`,
    javascript: `
const fs = require("fs");

function minJumps(nums) {
    let n = nums.length;
    if (n <= 1) {
        return 0;
    }
    
    let jumps = 0, currentEnd = 0, farthest = 0;
    for (let i = 0; i < n - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
            if (currentEnd >= n - 1) {
                break;
            }
        }
    }
    return jumps;
}

const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
let n_str = input[0];
let n = n_str === "NIL" ? 0 : parseInt(n_str, 10);
let nums = [];

if (n > 0) {
    for (let i = 1; i < input.length; i++) {
        nums.push(parseInt(input[i], 10));
    }
}

console.log(minJumps(nums));
`
  }
},

//Minimum Number of Days to Make m Bouquets
{
  _id: "7",  
  title: "Minimum Number of Days to Make m Bouquets",
  solutions: {
    cpp: `
#include <bits/stdc++.h>
using namespace std;

bool canMake(vector<int>& bloomDay, int m, int k, int day) {
    int count = 0, bouquets = 0;
    for (int b : bloomDay) {
        if (b <= day) {
            count++;
            if (count == k) {
                bouquets++;
                count = 0;
            }
        } else {
            count = 0;
        }
    }
    return bouquets >= m;
}

int minDays(vector<int>& bloomDay, int m, int k) {
    long long total = 1LL * m * k;
    if (total > bloomDay.size()) return -1;
    int left = 1, right = *max_element(bloomDay.begin(), bloomDay.end()), ans = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (canMake(bloomDay, m, k, mid)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

int main() {
    int n, m, k;
    cin >> n;
    vector<int> bloomDay(n);
    for (int i = 0; i < n; i++) cin >> bloomDay[i];
    cin >> m >> k;
    cout << minDays(bloomDay, m, k);
}











`,
















    java: `import java.util.*;

public class Main {
    public static boolean canMake(int[] bloomDay, int m, int k, int day) {
        int count = 0, bouquets = 0;
        for (int b : bloomDay) {
            if (b <= day) {
                count++;
                if (count == k) {
                    bouquets++;
                    count = 0;
                }
            } else {
                count = 0;
            }
        }
        return bouquets >= m;
    }

    public static int minDays(int[] bloomDay, int m, int k) {
        if ((long)m * k > bloomDay.length) return -1;
        int left = Arrays.stream(bloomDay).min().getAsInt();
        int right = Arrays.stream(bloomDay).max().getAsInt();
        int ans = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (canMake(bloomDay, m, k, mid)) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            String[] bloomStrings = sc.nextLine().trim().split("\\s+");
            if (bloomStrings.length != n) {
                System.out.println("Error: Number of elements does not match the value of n.");
                return;
            }
            int[] bloomDay = new int[n];
            for (int i = 0; i < n; i++) {
                bloomDay[i] = Integer.parseInt(bloomStrings[i].replaceAll("[^0-9]", ""));
            }

            String mkLine = sc.nextLine().trim();
            while (mkLine.isEmpty()) { // skip blank lines
                mkLine = sc.nextLine().trim();
            }
            String[] mk = mkLine.split("\\s+");
            if (mk.length == 1) { 
                // m and k are on separate lines
                int m = Integer.parseInt(mk[0]);
                int k = Integer.parseInt(sc.nextLine().trim());
                System.out.println(minDays(bloomDay, m, k));
            } else {
                int m = Integer.parseInt(mk[0]);
                int k = Integer.parseInt(mk[1]);
                System.out.println(minDays(bloomDay, m, k));
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please enter integers only.");
        }
        sc.close();
    }
}

 
 


`,
    python: `def can_make(bloom_day, m, k, day):
    count = 0
    bouquets = 0
    for b in bloom_day:
        if b <= day:
            count += 1
            if count == k:
                bouquets += 1
                count = 0
        else:
            count = 0
    return bouquets >= m

def min_days(bloom_day, m, k):
    total = m * k
    if total > len(bloom_day):
        return -1
    left, right = min(bloom_day), max(bloom_day)
    ans = -1
    while left <= right:
        mid = (left + right) // 2
        if can_make(bloom_day, m, k, mid):
            ans = mid
            right = mid - 1
        else:
            left = mid + 1
    return ans

try:
    n_line = input().strip()
    n = int(n_line)

    bloom_line = input().strip()
    bloom_day = [int(x.strip("[], ")) for x in bloom_line.split()]

    if len(bloom_day) != n:
        print("Error: Number of elements does not match the value of n.")
    else:
        mk_line = input().strip()
        while mk_line == "":
            mk_line = input().strip()
        mk_parts = mk_line.split()

        if len(mk_parts) == 1:
            m = int(mk_parts[0])
            k = int(input().strip())
        else:
            m = int(mk_parts[0])
            k = int(mk_parts[1])

        print(min_days(bloom_day, m, k))

except ValueError:
    print("Invalid input. Please enter integers only.")




 `,
    javascript: `
const fs = require("fs");

const canMake = (bloomDay, m, k, day) => {
    let count = 0, bouquets = 0;
    for (let b of bloomDay) {
        if (b <= day) {
            count++;
            if (count === k) {
                bouquets++;
                count = 0;
            }
        } else {
            count = 0;
        }
    }
    return bouquets >= m;
};

const minDays = (bloomDay, m, k) => {
    if (m * k > bloomDay.length) {
        return -1;
    }

    let left = Math.min(...bloomDay);
    let right = Math.max(...bloomDay);
    let ans = -1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (canMake(bloomDay, m, k, mid)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};

const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let n = input[0];
let bloomDay = input.slice(1, n + 1);
let m = input[n + 1];
let k = input[n + 2];

console.log(minDays(bloomDay, m, k));
`
  }
},



//House Robber II
  {
    _id: "5", // Replace with the actual MongoDB _id
    title: "House Robber II",
    solutions: {
      cpp: `
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Helper function for linear House Robber (fixed)
int robLinear(const vector<int>& nums) {
    int rob_prev = 0;
    int no_rob_prev = 0;

    for (int num : nums) {
        int temp_rob = no_rob_prev + num;
        int temp_no_rob = max(rob_prev, no_rob_prev);
        
        rob_prev = temp_rob;
        no_rob_prev = temp_no_rob;
    }
    return max(rob_prev, no_rob_prev);
}

// Main function for circular House Robber
int robCircular(const vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    // Case 1: Rob houses from index 0 to n-2
    vector<int> v1(nums.begin(), nums.end() - 1);
    // Case 2: Rob houses from index 1 to n-1
    vector<int> v2(nums.begin() + 1, nums.end());
    
    return max(robLinear(v1), robLinear(v2));
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << robCircular(nums) << endl;
    return 0;
}
`,
    java: `import java.util.*;

public class Main {
    static int robRange(int[] nums, int l, int r) {
        int prev = 0, curr = 0;
        for (int i = l; i <= r; i++) {
            int temp = Math.max(curr, prev + nums[i]);
            prev = curr;
            curr = temp;
        }
        return curr;
    }

    static int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            String[] numStrings = sc.nextLine().trim().split("\\s+");
            if (numStrings.length != n) {
                System.out.println("Error: Number of elements does not match the value of n.");
                return;
            }
            int[] nums = new int[n];
            for (int i = 0; i < n; i++) {
                nums[i] = Integer.parseInt(numStrings[i]);
            }
            System.out.println(rob(nums));
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please enter integers only.");
        }
    }
}

 

`,
    python: `
def rob_linear(nums):
    rob_prev = 0
    no_rob_prev = 0
    for num in nums:
        temp_rob = no_rob_prev + num
        temp_no_rob = max(rob_prev, no_rob_prev)
        
        rob_prev = temp_rob
        no_rob_prev = temp_no_rob
    return max(rob_prev, no_rob_prev)

def rob_circular(nums):
    n = len(nums)
    if n == 0:
        return 0
    if n == 1:
        return nums[0]
    
    v1 = nums[:-1]
    v2 = nums[1:]
    
    return max(rob_linear(v1), rob_linear(v2))

if __name__ == "__main__":
    try:
        n = int(input())
        if n == 0:
            print(0)
        else:
            nums = list(map(int, input().split()))
            print(rob_circular(nums))
    except (IOError, ValueError):
        print("Invalid input")
`,
    javascript: `
// Helper function for linear House Robber (fixed)
function robLinear(nums) {
    let robPrev = 0;
    let noRobPrev = 0;
    for (let num of nums) {
        let tempRob = noRobPrev + num;
        let tempNoRob = Math.max(robPrev, noRobPrev);
        
        robPrev = tempRob;
        noRobPrev = tempNoRob;
    }
    return Math.max(robPrev, noRobPrev);
}

// Main function for circular House Robber
function robCircular(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    
    // Case 1: Rob houses from index 0 to n-2
    const v1 = nums.slice(0, n - 1);
    // Case 2: Rob houses from index 1 to n-1
    const v2 = nums.slice(1);
    
    return Math.max(robLinear(v1), robLinear(v2));
}

// Standard input/output for competitive programming
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n = input[0];
const nums = input.slice(1, n + 1);
console.log(robCircular(nums));
`
    }
  },

 


//Binary Search
  {
    _id: "1", // ✅ Use the actual _id from your database
    title: "Binary Search",
    solutions: {
      cpp: `
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& nums, int target) {
int left = 0, right = nums.size() - 1;
while (left <= right) {
int mid = left + (right - left) / 2;
if (nums[mid] == target) return mid;
else if (nums[mid] < target) left = mid + 1;
else right = mid - 1;
}
return -1;
}

int main() {
int n, target;
cin >> n;
vector<int> nums(n);
for (int i = 0; i < n; i++) cin >> nums[i];
cin >> target;
cout << binarySearch(nums, target) << endl;
return 0;
}
`,
      java: `
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine());
            String[] numStrings = sc.nextLine().split(" ");
            if (numStrings.length != n) {
                System.out.println("Error: Number of elements does not match the value of n.");
                return;
            }
            int[] nums = new int[n];
            for (int i = 0; i < n; i++) {
                nums[i] = Integer.parseInt(numStrings[i]);
            }
            String targetStr = sc.nextLine();
            int target = Integer.parseInt(targetStr);
            int left = 0, right = n - 1;
            int result = -1;
            while (left <= right) {
                int mid = left + (right - left) / 2;
                if (nums[mid] == target) {
                    result = mid;
                    break;
                } else if (nums[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            System.out.println(result);
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please enter integers only.");
        }
    }
}
`,
      python: `
try:
    n = int(input())
    nums = list(map(int, input().split()))
    target_input = input()
    target = int(target_input);
    left, right = 0, n - 1
    result = -1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            result = mid
            break
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    print(result)
except ValueError:
    print("Invalid input. Please enter integers only.")
`,
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let input = [];
rl.on('line', function (line) {
    input.push(line);
    if (input.length === 3) {
        const n = parseInt(input[0]);
        const nums = input[1].split(' ').map(Number);
        const target = parseInt(input[2]);
        let left = 0, right = n - 1;
        let result = -1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                result = mid;
                break;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        console.log(result);
        rl.close();
    }
});
`,
    },
  },





//Subarray Sum Equals K
 {
    _id: "9",  
    title: "Subarray Sum Equals K",
    solutions: {
      cpp: `#include <bits/stdc++.h>
using namespace std;
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int,int> freq;
    freq[0] = 1;
    int count = 0, sum = 0;
    for (int x : nums) {
        sum += x;
        if (freq.count(sum - k)) count += freq[sum - k];
        freq[sum]++;
    }
    return count;
}
int main() {
    int n, k;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> k;
    cout << subarraySum(nums, k);
}


 



`,
      java: `import java.util.*;

public class Main {
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        freq.put(0, 1);
        int count = 0, currSum = 0;
        for (int x : nums) {
            currSum += x;
            count += freq.getOrDefault(currSum - k, 0);
            freq.put(currSum, freq.getOrDefault(currSum, 0) + 1);
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            String nLine = sc.nextLine().trim();
            int n = Integer.parseInt(nLine);

            String numsLine = sc.nextLine().trim();
            String[] numsStr = numsLine.split("\\s+");
            if (numsStr.length != n) {
                System.out.println("Error: Number of elements does not match the value of n.");
                return;
            }
            int[] nums = new int[n];
            for (int i = 0; i < n; i++) {
                nums[i] = Integer.parseInt(numsStr[i].replaceAll("[^0-9\\-]", ""));
            }

            String kLine = sc.nextLine().trim();
            int k = Integer.parseInt(kLine);

            System.out.println(subarraySum(nums, k));
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please enter integers only.");
        }
        sc.close();
    }
}



 
`,
      python: `def subarray_sum(nums, k):
    freq = {0: 1}
    count = 0
    curr_sum = 0
    for x in nums:
        curr_sum += x
        count += freq.get(curr_sum - k, 0)
        freq[curr_sum] = freq.get(curr_sum, 0) + 1
    return count

try:
    n_line = input().strip()
    n = int(n_line)
    nums_line = input().strip()
    nums = list(map(int, nums_line.split()))
    if len(nums) != n:
        print("Error: Number of elements does not match the value of n.")
    else:
        k_line = input().strip()
        k = int(k_line)
        print(subarray_sum(nums, k))
except ValueError:
    print("Invalid input. Please enter integers only.")



 








`,
      javascript: `const readline = require('readline');

function subarraySum(nums, k) {
  const freq = new Map([[0, 1]]);
  let count = 0, currSum = 0;
  for (const x of nums) {
    currSum += x;
    count += freq.get(currSum - k) || 0;
    freq.set(currSum, (freq.get(currSum) || 0) + 1);
  }
  return count;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inputLines = [];

rl.on('line', line => {
  inputLines.push(line.trim());
});

rl.on('close', () => {
  try {
    if (inputLines.length < 3) throw new Error('Insufficient input lines.');

    const n = parseInt(inputLines[0], 10);
    if (isNaN(n)) throw new Error('Invalid integer for n.');

    const numsStr = inputLines[1].split(/\s+/);
    if (numsStr.length !== n) {
      console.log('Error: Number of elements does not match the value of n.');
      return;
    }

    const nums = numsStr.map(x => {
      const num = parseInt(x.replace(/[^\d\-]/g, ''), 10);
      if (isNaN(num)) throw new Error('Invalid integer in nums.');
      return num;
    });

    const k = parseInt(inputLines[2], 10);
    if (isNaN(k)) throw new Error('Invalid integer for k.');

    console.log(subarraySum(nums, k));
  } catch (e) {
    console.log('Invalid input. Please enter integers only.');
  }
});


 




`,
    },
  },











];

const Solutions = () => {
    const { id } = useParams();
    const [selectedLanguage, setSelectedLanguage] = useState("cpp");
    const [problemData, setProblemData] = useState(null);

    useEffect(() => {
        const foundProblem = SOLUTIONS_DATA.find(p => p._id === id);
        if (foundProblem) {
            setProblemData(foundProblem);
        }
    }, [id]);

    const handleLanguageChange = (selectedOption) => {
        setSelectedLanguage(selectedOption.value);
    };

    const languageOptions = [
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "javascript", label: "JavaScript" },
    ];

    if (!problemData) {
        return (
            <>
                <div className="solutions-page-container">
                    <div className="solutions-content-wrapper">
                        <h2>Solution not found for this problem.</h2>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const solutionCode = problemData.solutions[selectedLanguage] || "";

    return (
        <>
            <div className="solutions-page-container">
                <div className="solutions-content-wrapper">
                    <h1>{problemData.title} Solution</h1>
                    
                    <div className="solutions-selector-wrapper">
                        <Select
                            value={languageOptions.find(
                                (option) => option.value === selectedLanguage
                            )}
                            options={languageOptions}
                            onChange={handleLanguageChange}
                            className="language-select"
                        />
                        <CopyToClipboard
                            text={solutionCode}
                            onCopy={() => alert("Copied to clipboard!")}
                        >
                            <button className="copy-button">Copy</button>
                        </CopyToClipboard>
                    </div>
                    
                    <div className="solutions-code-wrapper">
                        <SyntaxHighlighter language={selectedLanguage} style={docco} showLineNumbers className="code-block">
                            {solutionCode}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Solutions;