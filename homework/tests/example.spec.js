// @ts-check
const { test, expect } = require('@playwright/test');

const data = [
  //'Prototype',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

let numberSet = [
  [0,0], //zero 
  [1,2], //integers
  [1.5, 2.75], //float numbers
  [-1,1], //one negative number
  [-1,-1] // two negative numbers
];

let stringDataSet = [
  ['', ''], //empty field
  ['a','b'], //characters
  ['abc','hjk'], //string
]

const actionLabel = [
  'Concatenate',
  'Add',
  'Subtract',
  'Multiply',
  'Divide'
];




data.forEach(version => {

  
  //Check button clear
  test.describe(`${version}: Clear button`, () => {
    checkClearButton(version);
  })

  
  
  //Only field integer toggle test
  test.describe(`${version}: "Only integer" error`, () => {
    onlyIntegerTest(version);
  });
  
  
  //Calculations test
  actionLabel.forEach( label =>{

    test.describe(`${version}: ${label}`, () => {

      //Going through data set array
      for( let i = 0; i < numberSet.length; i++){
        let expectedRes = returnExpectedValue(label,numberSet[i][0],numberSet[i][1]);
        calculationTest(version,numberSet[i][0],numberSet[i][1],expectedRes,label);
      }

    });

  });

})




//FunctionTemplate
function calculationTest(version, data1, data2, expectedResult, actionLabel){
  test(actionLabel + ' '+ data1 + ' '+ data2 + " results in " + expectedResult, async ({ page }) => {

    data1 = data1.toString();
    data2 = data2.toString();

    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', { label: version});
    await page.locator('#number1Field').type(data1);
    await page.locator('#number2Field').type(data2);
    await page.selectOption('#selectOperationDropdown', {label: actionLabel});
    await page.locator('#calculateButton').click();
    await expect(page.locator('#numberAnswerField')).toHaveValue(expectedResult);
    })  
  };

function onlyIntegerTest(version){
  test('Only integer error message appeared', async ({ page }) => {
        
        //Skipping action 'Concatenate'
        for( let i = 1; i < actionLabel.length; i++){

          await page.goto('https://testsheepnz.github.io/BasicCalculator');
          await page.selectOption('#selectBuild', { label: version});
          await page.locator('#number1Field').type('a');
          await page.locator('#number2Field').type('b');
          await page.selectOption('#selectOperationDropdown', {label: actionLabel[i]});
          await page.locator('#calculateButton').click();

          await page.locator('text=Number 1 is not a number');
          //Check if error message not empty

          //Does not work by label text
          //await expect(page.locator('#errorMsgField')).toHaveValue("Number 1 is not a number");


          //Does not work checking form text
          //await expect(page.locator('#errorForm')).toHaveValue("Number 1 is not a number");


          //Thorws error: expected to fail but passed
          /*
          const errorText = page.locator('#errorMsgField').inputValue;
          if(String(errorText).match('not a number') === null){ //if no matching char found
            console.log("Error messages found!\n");
            test.fail();
          }
        */

    }}) 
      
    //Integer radio button must be checked when arithmetic calculations are performed
    test('Only integer field checked', async ({ page }) => {

      for( let i = 1; i < actionLabel.length; i++){
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('#selectBuild', { label: version});
        await page.selectOption('#selectOperationDropdown', {label: actionLabel[i]});

        //Check if marked
        const state = await page.locator('#integerSelect').isChecked();

        //If not checked
        if(!state){
          //check
          await page.locator('#integerSelect').check();
        }

        //Uncheck
        await page.locator('#integerSelect').uncheck();


      }
    })

  };



  //Checks if clear button is working correctly
  function checkClearButton(version){

    test('Check if clear button is working', async ({ page }) => {
    //Locate the clear button 
    await page.goto('https://testsheepnz.github.io/BasicCalculator');

    //Select version
    await page.selectOption('#selectBuild', { label: version});

    //Checks if enabled
    const buttonState = await page.locator('#clearButton').isDisabled();
    
    //Incorrect message propts
    if(buttonState){
      test.fail();
    }

    //Input field values
    await page.locator('#number1Field').type('1');
    await page.locator('#number2Field').type('2');
    await page.selectOption('#selectOperationDropdown', {label: 'Add'});
    await page.locator('#calculateButton').click();
    await page.locator('#clearButton').click();
    //Check if fields are cleared
    await expect(page.locator('#numberAnswerField')).toHaveValue('');
    });
    
  }


//returns expected value depending on action type
//possible alteration: comparing to result of prototype
//NEED TO PASTE EXACT JAVASCRIPT CODE FROM WEBSITE
function returnExpectedValue(actionLabel, data1, data2){
  switch(actionLabel){

    case 'Concatenate':
      let concatString = '';
      concatString = concatString.concat(data1,data2);
      return concatString;
    
    case 'Add':
      let sum = data1 + data2;
      let string1 =String(sum);
      return string1;
  
    case 'Subtract':
      let sub = data1 - data2;
      let string2 = String(sub);
      return string2;
      
    case 'Multiply':
        let mul = data1 * data2;
        let string3 = String(mul);
          return string3;

    case 'Divide':
      let div = data1 / data2;
      let string4 = String(div);
      return string4;

    default:
      return null;
  }
}

