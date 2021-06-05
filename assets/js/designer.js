
const ToolboxName = "Joon's Toolbox";
const Variation = {
    Home:{
        name: "Home",
        fullName: "Home",
        isDropdown: false,
        modules: [
            {name: "Home", full: "Home", forwardTo:"/"}
        ]
    },
    Calc:{
        name: "Calc.",
        fullName: "Calculator",
        isDropdown: true,
        modules: [
            {name: "MongoDB _id Calc.", full: "MongoDB _id Calculator", forwardTo:"/calculator/mongoDB_uid"}
        ]
    }
};

class Designer{
    buildNavbar(){
        function localNavbarElementBuilder(variationInput){
            let isDropdown = variationInput.isDropdown,
                skeleton = document.createElement("li");
            let localSkeleton = (!isDropdown) ? {
                body: document.createElement("a")
            } : {
                head: document.createElement("a"),
                element: variationInput.modules
            }

            skeleton.className = `nav-item${(isDropdown)?" dropdown":""}`;
            if(isDropdown){
                localSkeleton.head.className = "nav-link dropdown-toggle";
                localSkeleton.head.href = "#";
                localSkeleton.head.innerHTML = variationInput.name;
                localSkeleton.head.setAttribute("role", "button");
                localSkeleton.head.setAttribute("data-bs-toggle", "dropdown");
                localSkeleton.head.setAttribute("aria-expanded", "false");
                // Append head from local skeleton
                skeleton.appendChild(localSkeleton.head);
                // Create each dropdown element.
                localSkeleton.element.forEach((localData)=>{
                    let localCement = {
                        head: document.createElement("ul"),
                        body: document.createElement("li"),
                        element: document.createElement("a")
                    };
                    localCement.head.className = "dropdown-menu";
                    localCement.head.setAttribute("aria-labelledby", "navbarDropdown");
                    localCement.element.className = "dropdown-item";
                    localCement.element.href = localData.forwardTo;
                    localCement.element.innerHTML = localData.name;

                    localCement.body.appendChild(localCement.element);
                    localCement.head.appendChild(localCement.body);

                    skeleton.appendChild(localCement.head);
                    console.log(localData);
                });
            }else{
                localSkeleton.body.className = "nav-link";
                localSkeleton.body.href = variationInput.modules[0].forwardTo;
                localSkeleton.body.innerHTML = variationInput.modules[0].name;
                skeleton.appendChild(localSkeleton.body);
            }
            return skeleton;
        }
        console.log(localNavbarElementBuilder(Variation.Home));
        let localElement = {
            head: document.createElement("nav"),
            body: {
                head: document.createElement("div"),
                body: {
                    name: document.createElement("a"),
                    toggleButton: {
                        head: document.createElement("button"),
                        body: document.createElement("span"),
                    },
                    contentWrapper: {
                        head: document.createElement("div"),
                        body: document.createElement("ul")
                    }
                }
            }
        };
        localElement.head.className = "navbar navbar-expand-lg navbar-light bg-light";
        localElement.body.head.className = "container-fluid";
        localElement.body.body.name.className = "navbar-brand en-ViceCitySans";
        localElement.body.body.contentWrapper.head.className = "collapse navbar-collapse";
        localElement.body.body.contentWrapper.body.className = "navbar-nav me-auto mb-2 mb-lg-0";

        localElement.body.body.name.href = "/";
        localElement.body.body.name.innerHTML = `<i class='bi-tools'></i> ${ToolboxName}`;

        Object.keys(Variation).forEach((key)=>{
            localElement.body.body.contentWrapper.body.appendChild(localNavbarElementBuilder(Variation[key]));
        });

        localElement.body.body.contentWrapper.head.appendChild(localElement.body.body.contentWrapper.body);
        localElement.body.body.toggleButton.head.appendChild(localElement.body.body.toggleButton.body);
        localElement.body.head.append(localElement.body.body.name, localElement.body.body.contentWrapper.head);
        localElement.head.append(localElement.body.head);

        return localElement.head;
    }

    buildHeader(){

    }
}

let DesignToolbox = new Designer();
document.getElementById("_element_navbar").appendChild(DesignToolbox.buildNavbar());
