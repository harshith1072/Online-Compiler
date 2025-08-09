import React from "react";
import { useParams } from "react-router-dom";
import TestCasesComponent from "./TestCasesComponent";
// import Navbar from "./Navbar";
import Editor from "./Editor";
// import CodeEditor from "./CodeEditor"
// import Footer from "./Footer";
import "../Styles/FetchSingleProblem.css";

const problems = [

  //1
  [

      <>
<div className="Question">
  <h1><strong>Binary Search</strong></h1>
  <div className="elfjS" data-track-load="description_content">
    <p>
      Given an array of integers <code>nums</code> which is sorted in ascending order, and an integer <code>target</code>,
      write a function to search <code>target</code> in <code>nums</code>. If target exists, then return its index.
      Otherwise, return <code>-1</code>.
    </p>

    <p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>

    <p><strong className="example">Example 1:</strong></p>
    <pre>
      <strong>Input:</strong> nums = [-1,0,3,5,9,12], target = 9
      <br />
      <strong>Output:</strong> 4
    </pre>

    <p><strong className="example">Example 2:</strong></p>
    <pre>
      <strong>Input:</strong> nums = [-1,0,3,5,9,12], target = 2
      <br />
      <strong>Output:</strong> -1
    </pre>

    <p><strong>Constraints:</strong></p>
    <ul>
      <li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
      <li><code>-10<sup>4</sup> &lt;= nums[i], target &lt; 10<sup>4</sup></code></li>
      <li>All the integers in <code>nums</code> are unique.</li>
      <li><code>nums</code> is sorted in ascending order.</li>
    </ul>
 
  </div>
</div>
  </>,



  ],

 
  //2
  [

<div className="Question">
  <h1><strong>Next Greater Element I</strong></h1>
  <div className="elfjS" data-track-load="description_content">
    <p>
      The next greater element of some element <code>x</code> in an array is the first greater element that is to the right of <code>x</code> in the same array.
    </p>
    <p>
      You are given two distinct 0-indexed integer arrays <code>nums1</code> and <code>nums2</code>, where <code>nums1</code> is a subset of <code>nums2</code>.
    </p>
    <p>
      For each <code>0 &lt;= i &lt; nums1.length</code>, find the index <code>j</code> such that <code>nums1[i] == nums2[j]</code> and determine the next greater element of <code>nums2[j]</code> in <code>nums2</code>. If there is no next greater element, then the answer is <code>-1</code>.
    </p>
    <p>
      Return an array <code>ans</code> of length <code>nums1.length</code> such that <code>ans[i]</code> is the next greater element as described above.
    </p>

    <p><strong className="example">Example 1:</strong></p>
    <pre>
      <strong>Input:</strong> nums1 = [4,1,2], nums2 = [1,3,4,2]<br />
      <strong>Output:</strong> [-1,3,-1]
    </pre>

    <p><strong className="example">Example 2:</strong></p>
    <pre>
      <strong>Input:</strong> nums1 = [2,4], nums2 = [1,2,3,4]<br />
      <strong>Output:</strong> [3,-1]
    </pre>

    <p><strong>Constraints:</strong></p>
    <ul>
      <li><code>1 &lt;= nums1.length &lt;= nums2.length &lt;= 1000</code></li>
      <li><code>0 &lt;= nums1[i], nums2[i] &lt;= 10⁴</code></li>
      <li>All integers in <code>nums1</code> and <code>nums2</code> are unique.</li>
      <li>All the integers of <code>nums1</code> also appear in <code>nums2</code>.</li>
    </ul>
  </div>
</div>








 


 

  ],
  //3
  [
    <>
      <h1>Median Of Two Sorted Arrays</h1>
      <div className="elfjS" data-track-load="description_content">
        <p>
          Given two sorted arrays <code>nums1</code> and <code>nums2</code> of
          size <code>m</code> and <code>n</code> respectively, return{" "}
          <strong>the median</strong> of the two sorted arrays.
        </p>

        <p>
          The overall run time complexity should be <code>O(log (m+n))</code>.
        </p>

        <p>&nbsp;</p>
        <p>
          <strong className="example">Example 1:</strong>
        </p>

        <pre>
          <strong>Input:</strong> nums1 = [1,3], nums2 = [2]
          <br />
          <br />
          <strong>Output:</strong> 2.00000
          <br />
          <br />
          <strong>Explanation:</strong> merged array = [1,2,3] and median is 2.
        </pre>

        <p>
          <strong className="example">Example 2:</strong>
        </p>

        <pre>
          <strong>Input:</strong> nums1 = [1,2], nums2 = [3,4]
          <br />
          <br />
          <strong>Output:</strong> 2.50000
          <br />
          <br />
          <strong>Explanation:</strong> merged array = [1,2,3,4] and median is
          (2 + 3) / 2 = 2.5.
        </pre>

        <p>&nbsp;</p>
        <p>
          <strong>Constraints:</strong>
        </p>

        <ul>
          <li>
            <code>nums1.length == m</code>
          </li>
          <li>
            <code>nums2.length == n</code>
          </li>
          <li>
            <code>0 &lt;= m &lt;= 1000</code>
          </li>
          <li>
            <code>0 &lt;= n &lt;= 1000</code>
          </li>
          <li>
            <code>1 &lt;= m + n &lt;= 2000</code>
          </li>
          <li>
            <code>
              -10<sup>6</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>6</sup>
            </code>
          </li>
        </ul>
      </div>
    </>,
  ],
  //4
  [
    <>
      <h1>Valid Parenthesis</h1>
      <div className="elfjS" data-track-load="description_content">
        <p>
          Given a string <code>s</code> containing just the characters{" "}
          <code>'('</code>, <code>')'</code>, <code>'{"</code>, <code>"}'</code>
          , <code>'['</code> and <code>']'</code>, determine if the input string
          is valid.
        </p>

        <p>An input string is valid if:</p>

        <ol>
          <li>Open brackets must be closed by the same type of brackets.</li>
          <li>Open brackets must be closed in the correct order.</li>
          <li>
            Every close bracket has a corresponding open bracket of the same
            type.
          </li>
          <li>
            Return string "true" or "false" as the answer and not boolean!
          </li>
        </ol>

        <p>&nbsp;</p>
        <p>
          <strong className="example">Example 1:</strong>
        </p>

        <pre>
          <strong>Input:</strong> s = "()"
          <br />
          <br />
          <strong>Output:</strong> true
        </pre>

        <p>
          <strong className="example">Example 2:</strong>
        </p>

        <pre>
          <strong>Input:</strong> s = "()[]{}"
          <br />
          <br />
          <strong>Output:</strong> true
        </pre>

        <p>
          <strong className="example">Example 3:</strong>
        </p>

        <pre>
          <strong>Input:</strong> s = "(]"
          <br />
          <br />
          <strong>Output:</strong> false
        </pre>

        <p>&nbsp;</p>
        <p>
          <strong>Constraints:</strong>
        </p>

        <ul>
          <li>
            <code>
              1 &lt;= s.length &lt;= 10<sup>4</sup>
            </code>
          </li>
          <li>
            <code>s</code> consists of parentheses only <code>'()[]{}'</code>.
          </li>
        </ul>
      </div>
    </>,

    
  ],
  [
    <>
      <h1>Valid Sudoku</h1>
      <div className="elfjS" data-track-load="description_content">
        <p>
          Determine if a&nbsp;<code>9 x 9</code> Sudoku board&nbsp;is
          valid.&nbsp;Only the filled cells need to be validated&nbsp;
          <strong>according to the following rules</strong>:
        </p>

        <ol>
          <li>
            Each row&nbsp;must contain the&nbsp;digits&nbsp;<code>1-9</code>{" "}
            without repetition.
          </li>
          <li>
            Each column must contain the digits&nbsp;<code>1-9</code>
            &nbsp;without repetition.
          </li>
          <li>
            Each of the nine&nbsp;<code>3 x 3</code> sub-boxes of the grid must
            contain the digits&nbsp;<code>1-9</code>&nbsp;without repetition.
          </li>
        </ol>

        <p>
          <strong>Note:</strong>
        </p>

        <ul>
          <li>
            A Sudoku board (partially filled) could be valid but is not
            necessarily solvable.
          </li>
          <li>
            Only the filled cells need to be validated according to the
            mentioned&nbsp;rules.
          </li>
        </ul>

        <p>&nbsp;</p>
        <p>
          <strong className="example">Example 1:</strong>
        </p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png"
          //   style="height: 250px; width: 250px;"
          alt="dummy.img"
        />
        <pre>
          <strong>Input:</strong> board = [["5","3",".",".","7",".",".",".","."]
          ,["6",".",".","1","9","5",".",".","."]
          ,[".","9","8",".",".",".",".","6","."]
          ,["8",".",".",".","6",".",".",".","3"]
          ,["4",".",".","8",".","3",".",".","1"]
          ,["7",".",".",".","2",".",".",".","6"]
          ,[".","6",".",".",".",".","2","8","."]
          ,[".",".",".","4","1","9",".",".","5"]
          ,[".",".",".",".","8",".",".","7","9"]]
          <br />
          <br />
          <strong>Output:</strong> true
        </pre>

        <p>
          <strong className="example">Example 2:</strong>
        </p>

        <pre>
          <strong>Input:</strong> board = [["8","3",".",".","7",".",".",".","."]
          ,["6",".",".","1","9","5",".",".","."]
          ,[".","9","8",".",".",".",".","6","."]
          ,["8",".",".",".","6",".",".",".","3"]
          ,["4",".",".","8",".","3",".",".","1"]
          ,["7",".",".",".","2",".",".",".","6"]
          ,[".","6",".",".",".",".","2","8","."]
          ,[".",".",".","4","1","9",".",".","5"]
          ,[".",".",".",".","8",".",".","7","9"]]
          <br />
          <br />
          <strong>Output:</strong> false
          <br />
          <br />
          <strong>Explanation:</strong> Same as Example 1, except with the{" "}
          <strong>5</strong> in the top left corner being modified to{" "}
          <strong>8</strong>. Since there are two 8's in the top left 3x3
          sub-box, it is invalid.
        </pre>

        <p>&nbsp;</p>
        <p>
          <strong>Constraints:</strong>
        </p>

        <ul>
          <li>
            <code>board.length == 9</code>
          </li>
          <li>
            <code>board[i].length == 9</code>
          </li>
          <li>
            <code>board[i][j]</code> is a digit <code>1-9</code> or{" "}
            <code>'.'</code>.
          </li>
        </ul>
      </div>
      
    
    </>,
  ],










//5
  [<>
  <h1>House Robber II</h1>
  <div className="elfjS" data-track-load="description_content">
    <p>
      You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a <strong>circle</strong>. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.
    </p>

    <p>
      Given an integer array <code>nums</code> representing the amount of money of each house, return the <strong>maximum amount of money</strong> you can rob tonight without alerting the police.
    </p>

    <p>&nbsp;</p>
    <p><strong className="example">Example 1:</strong></p>
    <pre>
      <strong>Input:</strong> nums = [2,3,2]
      <br />
      <strong>Output:</strong> 3
      <br />
      <strong>Explanation:</strong> You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
    </pre>

    <p><strong className="example">Example 2:</strong></p>
    <pre>
      <strong>Input:</strong> nums = [1,2,3,1]
      <br />
      <strong>Output:</strong> 4
      <br />
      <strong>Explanation:</strong> Rob house 1 (money = 1) and then rob house 3 (money = 3).<br />
      Total amount you can rob = 1 + 3 = 4.
    </pre>

    <p><strong className="example">Example 3:</strong></p>
    <pre>
      <strong>Input:</strong> nums = [1,2,3]
      <br />
      <strong>Output:</strong> 3
    </pre>

    <p>&nbsp;</p>
    <p><strong>Constraints:</strong></p>
    <ul>
      <li><code>1 &lt;= nums.length &lt;= 100</code></li>
      <li><code>0 &lt;= nums[i] &lt;= 1000</code></li>
    </ul>
  </div>
</>,

  ],













//6
  [
    <>
      <h1>Jump Game II</h1>
      <div className="elfjS" data-track-load="description_content">
        <p>
          You are given a <strong>0-indexed</strong> array of integers{" "}
          <code>nums</code> of length <code>n</code>. You are initially
          positioned at <code>nums[0]</code>.
        </p>

        <p>
          Each element <code>nums[i]</code> represents the maximum length of a
          forward jump from index <code>i</code>. In other words, if you are at{" "}
          <code>nums[i]</code>, you can jump to any <code>nums[i + j]</code>{" "}
          where:
        </p>

        <ul>
          <li>
            <code>0 &lt;= j &lt;= nums[i]</code> and
          </li>
          <li>
            <code>i + j &lt; n</code>
          </li>
        </ul>

        <p>
          Return <em>the minimum number of jumps to reach </em>
          <code>nums[n - 1]</code>. The test cases are generated such that you
          can reach <code>nums[n - 1]</code>.
        </p>

        <p>&nbsp;</p>
        <p>
          <strong className="example">Example 1:</strong>
        </p>

        <pre>
          <strong>Input:</strong> nums = [2,3,1,1,4]
          <br />
          <br />
          <strong>Output:</strong> 2
          <br />
          <br />
          <strong>Explanation:</strong> The minimum number of jumps to reach the
          last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the
          last index.
        </pre>

        <p>
          <strong className="example">Example 2:</strong>
        </p>

        <pre>
          <strong>Input:</strong> nums = [2,3,0,1,4]
          <br />
          <br />
          <strong>Output:</strong> 2
        </pre>

        <p>&nbsp;</p>
        <p>
          <strong>Constraints:</strong>
        </p>

        <ul>
          <li>
            <code>
              1 &lt;= nums.length &lt;= 10<sup>4</sup>
            </code>
          </li>
          <li>
            <code>0 &lt;= nums[i] &lt;= 1000</code>
          </li>
          <li>
            It's guaranteed that you can reach <code>nums[n - 1]</code>.
          </li>
        </ul>
      </div>
    </>,
  ],





  //7
 

[
  <>
    <h1>Minimum Number of Days to Make m Bouquets</h1>
    <div className="elfjS" data-track-load="description_content">
      <p>
        You are given an integer array <code>bloomDay</code>, an integer{" "}
        <code>m</code>, and an integer <code>k</code>.
      </p>
      <p>
        You want to make <code>m</code> bouquets. To make a bouquet, you need to use <code>k</code> adjacent flowers from the garden.
      </p>
      <p>
        The garden consists of <code>n</code> flowers, the <code>i<sup>th</sup></code> flower will bloom in <code>bloomDay[i]</code> and can be used in exactly one bouquet.
      </p>
      <p>
        Return the <strong>minimum number of days</strong> you need to wait to be able to make <code>m</code> bouquets from the garden. If it is impossible to make <code>m</code> bouquets, return <code>-1</code>.
      </p>

      <p><strong className="example">Example 1:</strong></p>
      <pre>
        <strong>Input:</strong> bloomDay = [1,10,3,10,2], m = 3, k = 1
        <br />
        <strong>Output:</strong> 3
        <br />
        <strong>Explanation:</strong> 
        <br />
        After day 1: [x, _, _, _, _] → 1 bouquet
        <br />
        After day 2: [x, _, _, _, x] → 2 bouquets
        <br />
        After day 3: [x, _, x, _, x] → 3 bouquets (valid)
      </pre>

      <p><strong className="example">Example 2:</strong></p>
      <pre>
        <strong>Input:</strong> bloomDay = [1,10,3,10,2], m = 3, k = 2
        <br />
        <strong>Output:</strong> -1
        <br />
        <strong>Explanation:</strong> We need 6 flowers in total but only 5 exist.
      </pre>

      <p><strong className="example">Example 3:</strong></p>
      <pre>
        <strong>Input:</strong> bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
        <br />
        <strong>Output:</strong> 12
        <br />
        <strong>Explanation:</strong> After day 12, all are bloomed and we can form 2 bouquets of 3 adjacent flowers.
      </pre>

      <p><strong>Constraints:</strong></p>
      <ul>
        <li><code>bloomDay.length == n</code></li>
        <li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
        <li><code>1 &lt;= bloomDay[i] &lt;= 10<sup>9</sup></code></li>
        <li><code>1 &lt;= m &lt;= 10<sup>6</sup></code></li>
        <li><code>1 &lt;= k &lt;= n</code></li>
      </ul>
    </div>
  </>,
],




// 8
[
  <>
    <h1>Koko Eating Bananas</h1>
    <div className="elfjS" data-track-load="description_content">
      <p>
        Koko loves to eat bananas. There are <code>n</code> piles of bananas, the <code>i<sup>th</sup></code> pile has <code>piles[i]</code> bananas.
        The guards have gone and will come back in <code>h</code> hours.
      </p>
      <p>
        Koko can decide her bananas-per-hour eating speed of <code>k</code>. Each hour, she chooses some pile of bananas and eats <code>k</code> bananas from that pile.
        If the pile has less than <code>k</code> bananas, she eats all of them instead and will not eat any more bananas during this hour.
      </p>
      <p>
        Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
      </p>
      <p><strong>Return the minimum integer k such that she can eat all the bananas within h hours.</strong></p>

      <p><strong>Example 1:</strong></p>
      <pre>
        <strong>Input:</strong> piles = [3,6,7,11], h = 8<br/>
        <strong>Output:</strong> 4
      </pre>

      <p><strong>Example 2:</strong></p>
      <pre>
        <strong>Input:</strong> piles = [30,11,23,4,20], h = 5<br/>
        <strong>Output:</strong> 30
      </pre>

      <p><strong>Example 3:</strong></p>
      <pre>
        <strong>Input:</strong> piles = [30,11,23,4,20], h = 6<br/>
        <strong>Output:</strong> 23
      </pre>

      <p><strong>Constraints:</strong></p>
      <ul>
        <li><code>1 &lt;= piles.length &lt;= 10⁴</code></li>
        <li><code>piles.length &lt;= h &lt;= 10⁹</code></li>
        <li><code>1 &lt;= piles[i] &lt;= 10⁹</code></li>
      </ul>
    </div>
  </>,
],


//9
[
  <>
    <h1>Subarray Sum Equals K</h1>
    <div className="elfjS" data-track-load="description_content">
      <p>
        Given an array of integers <code>nums</code> and an integer{" "}
        <code>k</code>, return the total number of subarrays whose sum equals
        to <code>k</code>.
      </p>
      <p>A subarray is a contiguous non-empty sequence of elements within an array.</p>

      <p>
        <strong className="example">Example 1:</strong>
      </p>
      <pre>
        <strong>Input:</strong> nums = [1,1,1], k = 2
        <br />
        <strong>Output:</strong> 2
      </pre>

      <p>
        <strong className="example">Example 2:</strong>
      </p>
      <pre>
        <strong>Input:</strong> nums = [1,2,3], k = 3
        <br />
        <strong>Output:</strong> 2
      </pre>

      <p>
        <strong>Constraints:</strong>
      </p>
      <ul>
        <li>
          <code>1 &lt;= nums.length &lt;= 2 * 10⁴</code>
        </li>
        <li>
          <code>-1000 &lt;= nums[i] &lt;= 1000</code>
        </li>
        <li>
          <code>-10⁷ &lt;= k &lt;= 10⁷</code>
        </li>
      </ul>
    </div>
  </>,
],




 









];

// const FetchSingleProblem = () => {
//   const { id } = useParams();
  
//   return (
//     <div>
//       {/* <Navbar /> */}
//       <div className="app">
//         <div className="question-section">
//           {!id ? problems[0] : problems[id]}
//           <TestCasesComponent index={id} />
//         </div>
//         <div className="editor-section">
//           <Editor />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };
const FetchSingleProblem = () => {
  const { id } = useParams();
  const problemIndex = Number(id) || 0;

  return (
    <div>
      <div className="app">
        <div className="question-section">
          {problems[problemIndex]}
          <TestCasesComponent index={problemIndex} />
        </div>
        <div className="editor-section">
          <Editor />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};


export default FetchSingleProblem;
