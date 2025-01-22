let howToStartIndex = 1;
let addKeyAreaIndex = 1;
let courseCurricullumIndex = 1;
let faqIndex = 1;
let categoryCardIndex = 1;



function addCourseCurriculum() {
    const curriculumContainer = document.getElementById("curricullum-container");

    const headingBlock = document.createElement('div');
    headingBlock.classList.add('heading-block');
    headingBlock.style.width = '100%';

    headingBlock.innerHTML = `
        <label style="font-size:20px; font-weight:800; color:#1AAEF4;">Heading :</label>
        <input type="text" placeholder="Add Heading" name="courseCurricullum[${courseCurricullumIndex}][heading]" style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" required />
        <div class="details-container" id="details-container-${courseCurricullumIndex}" style="margin-top:10px">
            <label style="color:#1AAEF4; font-weight:600;">Details :</label>
            <input type="text" placeholder="Add Details" name="courseCurricullum[${courseCurricullumIndex}][details][]" style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" required />
        </div>
        <button type="button" onClick="addDetail(${courseCurricullumIndex})" style="margin-top:10px; background-color:green; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Add More Details</button>
        <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px; margin-left:20px;">Remove Heading</button>
    `;
    curriculumContainer.appendChild(headingBlock);
    courseCurricullumIndex++;
}

function addDetail(index) {
    const detailContainer = document.getElementById(`details-container-${index}`);

    const detailInput = document.createElement('div');
    detailInput.classList.add('detail-input-block');

    detailInput.innerHTML = `
        <input type="text" name="courseCurricullum[${index}][details][]" placeholder="Add Details" style="margin-top:10px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" required />
        <button type="button" onclick="removeDetails(this)" style="margin-top:10px; margin-left:85%; border: 2px; border-style: solid; border-color:black; background-color:red; color:white; padding: 0 4px;">Remove Detail</button>
    `;
    detailContainer.appendChild(detailInput);
}

function removeHeading(button) {
    button.parentElement.remove();
}

function removeDetails(button) {
    button.parentElement.remove();
}

function addKeyArea() {
    const keyAreaContainer = document.getElementById("keyArea-container");

    const keyAreaBlock = document.createElement('div');
    keyAreaBlock.classList.add('key-area-block');
    keyAreaBlock.style.width = '100%';

    keyAreaBlock.innerHTML = `
        <label style="font-size: 20px; font-weight: 400; color: #1AAEF4;" for="keyheading">Key Heading :</label>
        <input type="text" name="keyAreas[${addKeyAreaIndex}][heading]" id="keyheading" placeholder="Key Heading" required style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
        <label style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;" for="keydetails">Key Details :</label>
        <input type="text" name="keyAreas[${addKeyAreaIndex}][details]" id="keydetails" placeholder="Key Details" required style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
        <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Remove Area</button>
    `;
    keyAreaContainer.appendChild(keyAreaBlock);
    addKeyAreaIndex++;
}

function addToolsInHand() {
    const container = document.getElementById("toolsInHand-container");

    const toolsInHandBlock = document.createElement('div');
    toolsInHandBlock.style.width = '100%';

    toolsInHandBlock.innerHTML = `
        <input type="text" name="toolsInHand[]" required placeholder="Tools In Hand" style="margin-top:15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px; display:block" />
        <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Remove Tools In Hand</button>
    `;
    container.appendChild(toolsInHandBlock);
}

function addCourseBenefit() {
    const courseBenefitContainer = document.getElementById("courseBenefit-container");

    const benefitDiv = document.createElement('div');
    benefitDiv.style.width = '100%';

    benefitDiv.innerHTML = `
        <input type="text" name="benefits[]" required placeholder="Add Benefits" style="margin-top:15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px; display:block" />
        <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Remove Benefit</button>
    `;
    courseBenefitContainer.appendChild(benefitDiv);
}

function addKeyHighlight() {
    const container = document.getElementById("keyHighLights-container");

    const keyHighlightDiv = document.createElement('div');
    keyHighlightDiv.style.width = "100%";

    keyHighlightDiv.innerHTML = `
        <input type="text" name="keyHighLights[]" required placeholder="Key HighLights" style="margin-top: 15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
        <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Remove Highlight</button>
    `;
    container.appendChild(keyHighlightDiv);
}

function addJobRoles() {
    const container = document.getElementById("jobRoles-container");

    const jobRolDiv = document.createElement('div');
    jobRolDiv.style.width = '100%';

    jobRolDiv.innerHTML = `
        <input type="text" name="jobRoles[]" required placeholder="Add Job Roles" style="margin-top: 15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
        <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Remove Job Role</button>
    `;
    container.appendChild(jobRolDiv);
}

function addFAQs() {
    const container = document.getElementById("faqs-container");

    const faqDiv = document.createElement("div");
    faqDiv.style.width = '100%';

    faqDiv.innerHTML = `
        <label style="font-size: 20px; font-weight: 400; color: #1AAEF4;" for="faqheading">FAQ’s Heading :</label>
        <input type="text" name="fAQ[${faqIndex}][heading]" id="faqheading" required placeholder="FAQ’s Heading" style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
        <label style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;" for="faqdetails">FAQ’s Details :</label>
        <input type="text" name="fAQ[${faqIndex}][details]" required placeholder="FAQ’s Details" id="faqdetails" style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
        <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Remove This Faq</button>
    `;
    container.appendChild(faqDiv);
    faqIndex++;
}

function addHowToStart() {


    const container = document.getElementById("howToStart-container_");
    const div = document.createElement("div");
    div.style.width = '100%';

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
                              
                               <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Remove This Field</button>
   
                                            `;

    container.appendChild(div);
    howToStartIndex++;
}

function addYourImaginory() {

    const imaginoryContainer = document.getElementById("addYourImaginory-container");

    const div = document.createElement('div');

    div.style.width = '100%';

    div.innerHTML = `<input type="text" name="addYourImaginory[]" required placeholder="Add course we offer" style="margin-top: 15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
        <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Delete detail</button>
  `;

    imaginoryContainer.appendChild(div);

}
function addCardCategory() {
    const addCardContainer = document.getElementById("category-card-container");
    const addCardBlock = document.createElement('div');
    addCardBlock.classList.add('key-area-block');
    addCardBlock.style.width = '100%';
    addCardBlock.style.marginTop = '30px';

    addCardBlock.innerHTML = `
                                                    <label style="font-size: 20px; font-weight: 400; color: #1AAEF4;"
                                                        for="bg-color">Add Background color of card :</label>
                                                    <input type="text" name="detailsCard[${categoryCardIndex}][bgColor]" id="bg-color"
                                                        placeholder="Enter Background color property" required
                                                        style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
                                                    <label
                                                        style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;"
                                                        for="cardImg">Card Img :</label>
                                                    <input type="file" name="detailsCard[${categoryCardIndex}][img]" id="cardImg"
                                                        placeholder="Card Img" required
                                                        style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
                                                    <label
                                                        style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;"
                                                        for="cardImg">Enter Card Heading and details :</label>
                                                    <textarea  class="editor" type="text" name="detailsCard[${categoryCardIndex}][cardHeadandDetail]"
                                                        id="cardImg" placeholder="Enter Card Heading and details"
                                                        required
                                                        style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" ></textarea>
        <button type="button" onClick="removeHeading(this)" style="margin-top:10px; background-color:red; color:white; border: 2px; border-style: solid; border-color:black; padding: 0 4px;">Remove This Card</button>
    `;
    addCardContainer.appendChild(addCardBlock);
    categoryCardIndex++;

    $('.editor').trumbowyg({
        btns: [
            ['viewHTML'],
            ['formatting'],
            ['strong', 'em', 'underline', 'del'],
            ['superscript', 'subscript'],
            ['link'],
            ['insertImage'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['table'],
            ['foreColor', 'backColor'],
            ['fullscreen']
        ]

    });
}

// Display the toast message when it's added
document.addEventListener('DOMContentLoaded', () => {
    const successToast = document.querySelector('.success-toast');
    const errorToast = document.querySelector('.error-toast');

    // If there's a success message, show the toast and remove after 3 seconds
    if (successToast) {
        successToast.style.display = 'block';
        setTimeout(() => {
            successToast.style.display = 'none';
        }, 5000); // Hide after 3 seconds
    }

    // If there's an error message, show the toast and remove after 3 seconds
    if (errorToast) {
        errorToast.style.display = 'block';
        setTimeout(() => {
            errorToast.style.display = 'none';
        }, 5000); // Hide after 3 seconds
    }
});


// function addPartners() {
//     const container = document.getElementById("partner-container");

//     container.insertAdjacentHTML('beforeend', `
//        <input type="file" name="img" required
//                                             placeholder="Add Job Roles"
//                                             style=" margin-top:15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
//                                 ` );
// }