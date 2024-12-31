let howToStartIndex = 1;
let addKeyAreaIndex = 0;
let faqIndex = 1;
let courseCurricullumIndex = 0;


function addCourseCurriculum() {


    const curriculumContainer = document.getElementById("curricullum-container");

    const headingBlock = document.createElement('div');

    headingBlock.classList.add('heading-block');

    headingBlock.innerHTML = `
            <label style="font-size:"20px" >Heading : </label>
            <input type="text" name="courseCurricullum[${courseCurricullumIndex}][heading]" style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" required />
            <div class="details-container" id="details-container-${courseCurricullumIndex}" >
                <label>Details :  </label>
                <input type="text" name="courseCurricullum[${courseCurricullumIndex}][details][]" style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" required />
            </div>
            <button type="button" onClick="addDetail(${courseCurricullumIndex})" style="border: 1px; border-style: solid; padding: 0 4px; ">Add More Details </button>
            <button type="button" onClick="removeHeading(this)" style="border: 1px; border-style: solid; padding: 0 4px; ">Remove Heading </button>

    `;
    curriculumContainer.appendChild(headingBlock);
    courseCurricullumIndex++;

}

//function to add more specific details for a heading

function addDetail(index) {
    const detailContainer = document.getElementById(`details-container-${index}`);

    const detailInput = document.createElement('div');

    detailInput.innerHTML = `
    <input type="text" name="courseCurricullum[${index}][details][]" style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" required />
    <button type="button" onclick="removeDetails(this)" style="border: 1px; border-style: solid; padding: 0 4px; ">Remove Detail</button>
    `;

    detailContainer.appendChild(detailInput);

}

//function to remove a heading block 
function removeHeading(button) {
    button.parentElement.remove();
}

// function to remove a detail input field

function removeDetails(button) {
    button.parentElement.remove();
}

function addKeyArea() {

    const keyAreaContainer = document.getElementById("keyArea-container");

    const keyAreaBlock = document.createElement('div');

    keyAreaBlock.classList.add('key-area-block');

    keyAreaBlock.innerHTML = `<label style="font-size: 20px; font-weight: 400; color: #1AAEF4;"
                                                    for="keyheading">Key Heading : </label>
                                                <input type="text" name="keyAreas[${addKeyAreaIndex}][heading]" id="keyheading"
                                                    placeholder="Key Heading"
                                                    style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />


                                                <label
                                                    style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;"
                                                    for="keydetails">Key Details : </label>
                                                <input type="text" name="keyAreas[${addKeyAreaIndex}][details]" id="keydetails"
                                                    placeholder="Key Details" id="keydetails"
                                                    style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
                                                <div>
                   <button type="button" onClick="addDetail(${courseCurricullumIndex})" style="border: 1px; border-style: solid; padding: 0 4px; ">Add More Details </button>
                   <button type="button" onClick="removeHeading(this)" style="border: 1px; border-style: solid; padding: 0 4px; ">Remove Heading </button>

                                                </div>
                                                    
                                                    `

    keyAreaContainer.appendChild(keyAreaBlock);

}

// function addKeyArea() {
//     const container = document.getElementById("keyAreas-container");
//     const div = document.createElement("div");
//     div.innerHTML = ` <label style="font-size: 20px; font-weight: 400; color: #1AAEF4;"
//                                                     for="keyheading">Key Heading : </label>
//                                                 <input type="text" name="keyAreas[${addKeyAreaIndex}][heading]" id="keyheading"
//                                                     placeholder="Key Heading"
//                                                     style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />


//                                                 <label
//                                                     style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;"
//                                                     for="keydetails">Key Details : </label>
//                                                 <input type="text" name="keyAreas[${addKeyAreaIndex}][details]" id="keydetails"
//                                                     placeholder="Key Details" id="keydetails"
//                                                     style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />`;

//     container.appendChild(div);
//     addKeyAreaIndex++;
// }

function addTools() {


    const container = document.getElementById("toolsInHand-container");

    container.insertAdjacentHTML('beforeend', `
        <input type="text" name="toolsInHand[]"  required
                                                placeholder="Tools In Hand"
                                                style="margin-top:15px;  border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px; display:block" />`
    );

}

function addBenefits() {

    console.log("i am benefits");

    const container = document.getElementById("courseBenefits-container");

    container.insertAdjacentHTML('beforeend', ` <input type="text" name="benefits[]"  required
                                            placeholder=" Course Benefit"
                                            style=" margin-top:15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />`);

}

// function addCourseCurriculum(courseHeading) {

//     let courseDetails = 1;

//     console.log("Hi i am in key Areas");
//     const container = document.getElementById("courseCurriculum-container");
//     // console.log(container);
//     const div = document.createElement("div");
//     div.innerHTML = `    <label style="font-size: 20px; font-weight: 400; color: #1AAEF4;"
//                                                 >Curriculum Heading : </label>
//                                             <input type="text" name="courseCurriculum[${courseHeading}][heading]"  required
//                                                 placeholder="Curriculum Heading"
//                                                 style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
//                                             <div style="padding: 20px;">
//                                                 <div style="margin: 20px; border: 2px; border-style: solid;  padding: 15px;" >
//                                                     <div style="display: flex; justify-content: space-between;" >
//                                                         <label 
//                                                             style="display:block;  font-size: 20px; font-weight: 700; color: #1AAEF4; margin-top: 20px; margin-left:20px ;">
//                                                             Curriculum Details : </label>
//                                                         <div style="display: flex; gap: 10px; margin-right: 20px; align-items: baseline;">
//                                                             <label for="addmorecurriculumdetails"
//                                                                 style="color: gray; font-weight: 600; display: block; cursor: pointer;">Add
//                                                                 More Details</label>
//                                                             <button type="button" id="addmorecurriculumdetails"
//                                                                 style="border: 1px; border-style: solid; padding: 0 4px; "
//                                                                 onclick="addCurriculumDetails()">+</button>
//                                                         </div>
//                                                     </div>
//                                                     <div id="courseBenefits-container">
//                                                     <input type="text" name="courseCurriculum[${courseHeading}][details][0]"  required
//                                                         placeholder=" Course Curriculum"
//                                                         style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
//                                                     </div>
//                                                 </div>
//                                             </div>`;

//     container.appendChild(div);



//   return  function addCurriculumDetails() {

//         const container = document.getElementById("courseDetails-container");

//         container.insertAdjacentHTML('beforeend', `
//           <input type="text" name="courseCurriculum[${courseHeading}][details][${courseDetails}]"
//         required placeholder=" Course Curriculum"
//         style="margin-top:15px;  border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />`
//         );

//         courseDetails++;

//     }

// }

// function addCurriculumDetails() {
//     const container = document.getElementById("courseDetails-container");

//     container.insertAdjacentHTML('beforeend', `
//       <input type="text" name="courseCurriculum[][details][]"
//             required placeholder=" Course Curriculum"
//          style="margin-top:15px;  border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />`
//     );
// }

function addKeyHighLights() {


    const container = document.getElementById("keyHighLights-container");

    container.insertAdjacentHTML('beforeend', `
     <input type="text" name="keyHighLights[]" required
                                                    placeholder="Key HighLights"
                                                    style="margin-top: 15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />` );
}

function addJobRoles() {
    const container = document.getElementById("jobRoles-container");

    container.insertAdjacentHTML('beforeend', `
       <input type="text" name="jobRoles[]" required
                                                    placeholder="Add Job Roles"
                                                    style=" margin-top: 15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />` );
}



function addFAQs() {
    const container = document.getElementById("faqs-container");
    const div = document.createElement("div");
    div.innerHTML = `  <label style="font-size: 20px; font-weight: 400; color: #1AAEF4;"
                                                    for="faqheading">FAQ’s Heading : </label>
                                                <input type="text" name="fAQ[${faqIndex}][heading]" id="faqheading" required
                                                    placeholder="FAQ’s Heading"
                                                    style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />


                                                <label
                                                    style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;"
                                                    for="faqdetails">FAQ’s Details : </label>
                                                <input type="text" name="fAQ[${faqIndex}][details]"  required
                                                    placeholder="FAQ’s Details" id="faqdetails"
                                                    style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
                                    `;

    container.appendChild(div);

    faqIndex++;
}

function addHowToStart() {

    console.log("ADD TO START");
    const container = document.getElementById("howToStart-container");
    const div = document.createElement("div");
    div.innerHTML = `  <label style="font-size: 20px; font-weight: 400; color: #1AAEF4;"
                                            >How To Start Heading : </label>
                                        <input type="text" name="howToStart[${howToStartIndex}][heading]"  required
                                            placeholder="Key Heading"
                                            style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />


                                        <label
                                            style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;"
                                            >How To Start Details : </label>
                                        <input type="text" name="howToStart[${howToStartIndex}][details]"  required
                                            placeholder="Key Details" 
                                            style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
                               `;

    container.appendChild(div);
    howToStartIndex = howToStartIndex + 1;
}

function addPartners() {
    const container = document.getElementById("partner-container");

    container.insertAdjacentHTML('beforeend', `
       <input type="file" name="img" required
                                            placeholder="Add Job Roles"
                                            style=" margin-top:15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
                                ` );
}