function addKeyArea() {
      const container = document.getElementById("keyAreas-container"); 
    const div = document.createElement("div");
    div.innerHTML = ` <label style="font-size: 20px; font-weight: 400; color: #1AAEF4;"
                                                    for="keyheading">Key Heading : </label>
                                                <input type="text" name="keyAreas[][heading]" id="keyheading"
                                                    placeholder="Key Heading"
                                                    style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />


                                                <label
                                                    style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;"
                                                    for="keydetails">Key Details : </label>
                                                <input type="text" name="keyAreas[][details]" id="keydetails"
                                                    placeholder="Key Details" id="keydetails"
                                                    style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />`;
    
     container.appendChild(div);


}

function addTools()
{
   

    const container = document.getElementById("toolsInHand-container");

    container.insertAdjacentHTML('beforeend', `
        <input type="text" name="toolsInHand[]"  required
                                                placeholder="Tools In Hand"
                                                style="margin-top:15px;  border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px; display:block" />`
      );

}

function addBenefits()
{

console.log("i am benefits");

const container = document.getElementById("courseBenefits-container");

container.insertAdjacentHTML('beforeend',` <input type="text" name="benefits[]"  required
                                            placeholder=" Course Benefit"
                                            style=" margin-top:15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />`);

}

function addCourseCurriculum() {
    console.log("Hi i am in key Areas");
    const container = document.getElementById("courseCurriculum-container");
   // console.log(container);
    const div = document.createElement("div");
    div.innerHTML = `    <label style="font-size: 20px; font-weight: 400; color: #1AAEF4;"
                                                >Curriculum Heading : </label>
                                            <input type="text" name="courseCurriculum[][heading]"  required
                                                placeholder="Curriculum Heading"
                                                style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
                                            <div style="padding: 20px;">
                                                <div style="margin: 20px; border: 2px; border-style: solid;  padding: 15px;" >
                                                    <div style="display: flex; justify-content: space-between;" >
                                                        <label 
                                                            style="display:block;  font-size: 20px; font-weight: 700; color: #1AAEF4; margin-top: 20px; margin-left:20px ;">
                                                            Curriculum Details : </label>
                                                        <div style="display: flex; gap: 10px; margin-right: 20px; align-items: baseline;">
                                                            <label for="addmorecurriculumdetails"
                                                                style="color: gray; font-weight: 600; display: block; cursor: pointer;">Add
                                                                More Details</label>
                                                            <button type="button" id="addmorecurriculumdetails"
                                                                style="border: 1px; border-style: solid; padding: 0 4px; "
                                                                onclick="addCurriculumDetails()">+</button>
                                                        </div>
                                                    </div>
                                                    <div id="courseBenefits-container">
                                                    <input type="text" name="courseCurriculum[][details][]"  required
                                                        placeholder=" Course Curriculum"
                                                        style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
                                                    </div>
                                                </div>
                                            </div>`;

     container.appendChild(div);

}

function addCurriculumDetails()
{
   

    const container = document.getElementById("courseDetails-container");

    container.insertAdjacentHTML('beforeend', `
      <input type="text" name="courseCurriculum[][details][]"
                                                                    required placeholder=" Course Curriculum"
                                                                    style="margin-top:15px;  border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />`
      );
}

function addKeyHighLights()
{
   

    const container = document.getElementById("keyHighLights-container");

    container.insertAdjacentHTML('beforeend', `
     <input type="text" name="keyHighLights[]" required
                                                    placeholder="Key HighLights"
                                                    style="margin-top: 15px; border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />` );
}

function addJobRoles()
{
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
                                                <input type="text" name="fAQ[][heading]" id="faqheading" required
                                                    placeholder="FAQ’s Heading"
                                                    style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />


                                                <label
                                                    style="font-size: 20px; font-weight: 400; color: #1AAEF4; margin-top: 20px; display: block;"
                                                    for="faqdetails">FAQ’s Details : </label>
                                                <input type="text" name="fAQ[][details]"  required
                                                    placeholder="FAQ’s Details" id="faqdetails"
                                                    style="border: 1px; border-style: solid; width: 100%; height: 60px; padding: 10px 10px;" />
                                    `;
  
   container.appendChild(div);
}

