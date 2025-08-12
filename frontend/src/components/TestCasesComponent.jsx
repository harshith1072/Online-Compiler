 
import React, { useState, useEffect } from "react";
import TestCaseList from "./TestCaseList";
import "../Styles/TestCases.css";
import TestCaseForm from "./TestCaseForm";

const TestCasesComponent = (props) => {
  const testCases = [
    //1
    [
  {
    id: 1,
    inputs: [
      { name: "Nums", value: [-1, 0, 3, 5, 9, 12] },
      { name: "Target", value: [9] },
    ],
    output: [4],
  },
  {
    id: 2,
    inputs: [
      { name: "Nums", value: [-1, 0, 3, 5, 9, 12] },
      { name: "Target", value: [2] },
    ],
    output: [-1],
  },
  // {
  //   id: 3,
  //   inputs: [
  //     { name: "Nums", value: [1] },
  //     { name: "Target", value: [1] },
  //   ],
  //   output: [0],
  // },
  // {
  //   id: 4,
  //   inputs: [
  //     { name: "Nums", value: [10, 20, 30, 40, 50] },
  //     { name: "Target", value: [30] },
  //   ],
  //   output: [2],
  // },
  // {
  //   id: 5,
  //   inputs: [
  //     { name: "Nums", value: [1, 3, 5, 7, 9, 11] },
  //     { name: "Target", value: [4] },
  //   ],
  //   output: [-1],
  // },
],
//2

   
[
  {
    id: 1,
    inputs: [
      { name: "nums1", value: [4, 1, 2] },
      { name: "nums2", value: [1, 3, 4, 2] },
    ],
    output: [-1, 3, -1],
  },
  {
    id: 2,
    inputs: [
      { name: "nums1", value: [2, 4] },
      { name: "nums2", value: [1, 2, 3, 4] },
    ],
    output: [3, -1],
  },
  // {
  //   id: 3,
  //   inputs: [
  //     { name: "nums1", value: [1, 5] },
  //     { name: "nums2", value: [6, 5, 4, 3, 2, 1, 7] },
  //   ],
  //   output: [7, 7],
  // },
  // {
  //   id: 4,
  //   inputs: [
  //     { name: "nums1", value: [1] },
  //     { name: "nums2", value: [1, 2] },
  //   ],
  //   output: [2],
  // },
  // {
  //   id: 5,
  //   inputs: [
  //     { name: "nums1", value: [3, 5, 1] },
  //     { name: "nums2", value: [1, 3, 4, 5, 6] },
  //   ],
  //   output: [4, 6, 3],
  // },
],




//3


   [
  {
    id: 1,
    inputs: [
      { name: "Nums1", value: [1, 3] },
      { name: "Nums2", value: [2] }
    ],
    output: [2.0]
  },
  {
    id: 2,
    inputs: [
      { name: "Nums1", value: [1, 2] },
      { name: "Nums2", value: [3, 4] }
    ],
    output: [2.5]
  },
  {
    id: 3,
    inputs: [
      { name: "Nums1", value: [0, 0] },
      { name: "Nums2", value: [0, 0] }
    ],
    output: [0.0]
  },
  {
    id: 4,
    inputs: [
      { name: "Nums1", value: [] },
      { name: "Nums2", value: [1] }
    ],
    output: [1.0]
  },
  {
    id: 5,
    inputs: [
      { name: "Nums1", value: [2] },
      { name: "Nums2", value: [] }
    ],
    output: [2.0]
  }
],
//4

     [
  {
    id: 1,
    inputs: [{ name: "String", value: ["()"] }],
    output: ["true"]
  },
  {
    id: 2,
    inputs: [{ name: "String", value: ["()[]{}"] }],
    output: ["true"]
  },
  // {
  //   id: 3,
  //   inputs: [{ name: "String", value: ["(]"] }],
  //   output: ["false"]
  // },
  // {
  //   id: 4,
  //   inputs: [{ name: "String", value: ["([)]"] }],
  //   output: ["false"]
  // },
  // {
  //   id: 5,
  //   inputs: [{ name: "String", value: ["{[]}"] }],
  //   output: ["true"]
  // }
],

//5
[
  {
    id: 1,
    inputs: [
      {
        name: "Board",
        value: [
          ["5", "3", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", "8", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ],
      },
    ],
    output: ["true"],
  },
  {
    id: 2,
    inputs: [
      {
        name: "Board",
        value: [
          ["8", "3", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", "8", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ],
      },
    ],
    output: ["false"],
  },
  {
    id: 3,
    inputs: [
      {
        name: "Board",
        value: [
          ["5", "3", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", "8", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", ".", "9"],
        ],
      },
    ],
    output: ["true"],
  },
  {
    id: 4,
    inputs: [
      {
        name: "Board",
        value: [
          ["5", "5", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", "8", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ],
      },
    ],
    output: ["false"],
  },
  {
    id: 5,
    inputs: [
      {
        name: "Board",
        value: [
          ["5", "3", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", ".", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ],
      },
    ],
    output: ["true"],
  },
],
//6 

[
  {
    id: 1,
    inputs: [{ name: "nums", value: [2, 3, 2] }],
    output: [3],
  },
  {
    id: 2,
    inputs: [{ name: "nums", value: [1, 2, 3, 1] }],
    output: [4],
  },
  // {
  //   id: 3,
  //   inputs: [{ name: "nums", value: [1, 2, 3] }],
  //   output: [3],
  // },
  // {
  //   id: 4,
  //   inputs: [{ name: "nums", value: [0] }],
  //   output: [0],
  // },
  // {
  //   id: 5,
  //   inputs: [{ name: "nums", value: [100, 1, 1, 100] }],
  //   output: [200],
  // },
],

//jumpgame

 [
  {
    id: 1,
    inputs: [
      { name: "nums", value: ["[2,3,1,1,4]"] }
    ],
    output: ["2"],
  },
  {
    id: 2,
    inputs: [
      { name: "nums", value: ["[2,3,0,1,4]"] }
    ],
    output: ["2"],
  },
  // {
  //   id: 3,
  //   inputs: [
  //     { name: "nums", value: ["[1,2,3]"] }
  //   ],
  //   output: ["2"],
  // },
  // {
  //   id: 4,
  //   inputs: [
  //     { name: "nums", value: ["[5,9,3,2,1,0,2,3,3,1,0,0]"] }
  //   ],
  //   output: ["3"],
  // },
  // {
  //   id: 5,
  //   inputs: [
  //     { name: "nums", value: ["[1,1,1,1,1]"] }
  //   ],
  //   output: ["4"],
  // },
],





//Minimum Number of Days to Make m Bouquets
[
  {
    id: 1,
    inputs: [
      { name: "bloomDay", value: ["[1,10,3,10,2]"] },
      { name: "m", value: ["3"] },
      { name: "k", value: ["1"] },
    ],
    output: ["3"],
  },
  {
    id: 2,
    inputs: [
      { name: "bloomDay", value: ["[1,10,3,10,2]"] },
      { name: "m", value: ["3"] },
      { name: "k", value: ["2"] },
    ],
    output: ["-1"],
  },
  // {
  //   id: 3,
  //   inputs: [
  //     { name: "bloomDay", value: ["[7,7,7,7,12,7,7]"] },
  //     { name: "m", value: ["2"] },
  //     { name: "k", value: ["3"] },
  //   ],
  //   output: ["12"],
  // },
  // {
  //   id: 4,
  //   inputs: [
  //     { name: "bloomDay", value: ["[1000000000,1000000000]"] },
  //     { name: "m", value: ["1"] },
  //     { name: "k", value: ["2"] },
  //   ],
  //   output: ["1000000000"],
  // },
  // {
  //   id: 5,
  //   inputs: [
  //     { name: "bloomDay", value: ["[1,10,2,9,3,8,4,7,5,6]"] },
  //     { name: "m", value: ["4"] },
  //     { name: "k", value: ["2"] },
  //   ],
  //   output: ["9"],
  // },
],







//koko
 [
  {
    id: 1,
    inputs: [
      { name: "piles", value: ["[3,6,7,11]"] },
      { name: "h", value: ["8"] },
    ],
    output: ["4"],
  },
  {
    id: 2,
    inputs: [
      { name: "piles", value: ["[30,11,23,4,20]"] },
      { name: "h", value: ["5"] },
    ],
    output: ["30"],
  },
  // {
  //   id: 3,
  //   inputs: [
  //     { name: "piles", value: ["[30,11,23,4,20]"] },
  //     { name: "h", value: ["6"] },
  //   ],
  //   output: ["23"],
  // },
  // {
  //   id: 4,
  //   inputs: [
  //     { name: "piles", value: ["[1,1,1,1,1,1,1,1]"] },
  //     { name: "h", value: ["8"] },
  //   ],
  //   output: ["1"],
  // },
  // {
  //   id: 5,
  //   inputs: [
  //     { name: "piles", value: ["[1000000000]"] },
  //     { name: "h", value: ["2"] },
  //   ],
  //   output: ["500000000"],
  // },
],



//Subarray Sum Equals K
[
  {
    id: 1,
    inputs: [
      { name: "nums", value: ["[1,1,1]"] },
      { name: "k", value: ["2"] }
    ],
    output: ["2"]
  },
  {
    id: 2,
    inputs: [
      { name: "nums", value: ["[1,2,3]"] },
      { name: "k", value: ["3"] }
    ],
    output: ["2"]
  },
  // {
  //   id: 3,
  //   inputs: [
  //     { name: "nums", value: ["[3,4,7,2,-3,1,4,2]"] },
  //     { name: "k", value: ["7"] }
  //   ],
  //   output: ["4"]
  // },
  // {
  //   id: 4,
  //   inputs: [
  //     { name: "nums", value: ["[1,-1,0]"] },
  //     { name: "k", value: ["0"] }
  //   ],
  //   output: ["3"]
  // },
  // {
  //   id: 5,
  //   inputs: [
  //     { name: "nums", value: ["[0,0,0,0,0,0,0,0,0,0]"] },
  //     { name: "k", value: ["0"] }
  //   ],
  //   output: ["55"]
  // }
],


 












  ];

  useEffect(() => {
    console.log("Props received in TestCasesComponent:", props);
  }, [props]);

  // Parse id to integer, fallback to 0 if NaN
  const testCaseIndex = parseInt(props.index, 10) || 0;

  console.log("testCaseIndex:", testCaseIndex);

  return (
    <div className="test-cases-component">
      <h2>Sample Test Cases</h2>

      {testCases[testCaseIndex] && testCaseIndex !== 4 ? (
        <TestCaseList testCases={testCases[testCaseIndex]} />
      ) : (
        <>
          <p>Testcases not available :(</p>
          <p>Kindly Check the examples given for a clearer undertanding</p>
          <p>Mail us at: harshithmateti2005@gmail.com for letting us know.</p>
        </>
      )}

      {/* Additional rendering for the board test cases */}
      {testCases[4] && testCaseIndex === 4 && (
        <div>
          {testCases[4].map((testCase) => (
            <div key={testCase.id} className="board-test-case">
              <h3>Test Case {testCase.id}</h3>
              <pre>
                {testCase.inputs[0].value.map((row, rowIndex) => (
                  <div key={rowIndex}>{row.join(" ")}</div>
                ))}
              </pre>
              <p>
                <b>Expected Output: </b> {testCase.output}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestCasesComponent;
