/* ============================================================
   EMPLOYEE PROFILE JAVASCRIPT
   Bank Management System
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================================
       CONFIGURATION
       ======================================================== */

    const BACKEND_PORT = "8082";

    const API_BASE_URL =
        `http://localhost:${BACKEND_PORT}/api/employee`;


    /* ========================================================
       GET EMPLOYEE ID
       ======================================================== */

    /*
     * Employee ID should come from sessionStorage.
     *
     * Example:
     *
     * sessionStorage.setItem("employeeId", employeeId);
     */

    let employeeId =
        sessionStorage.getItem("employeeId");


    /*
     * Temporary testing value.
     *
     * Employee ID 5 exists in your database.
     *
     * Remove this fallback after your login/session flow
     * is completely connected.
     */

    if (!employeeId) {

        console.warn(
            "Employee ID not found in sessionStorage. Using temporary ID 5."
        );

        employeeId = "5";
    }


    /*
     * IMPORTANT:
     *
     * Convert employeeId to String.
     *
     * Do NOT use:
     *
     * document.getElementById(...)
     *
     * as employeeId.
     *
     * Otherwise URL becomes:
     *
     * [object HTMLElement]
     */

    employeeId = String(employeeId).trim();


    console.log(
        "Employee ID:",
        employeeId
    );


    /* ========================================================
       DOM ELEMENTS
       ======================================================== */

    const profileImage =
        document.getElementById("profileImage");

    const profileImageInput =
        document.getElementById("profileImageInput");

    const changePhotoBtn =
        document.getElementById("changePhotoBtn");


    const openModalBtn =
        document.getElementById("openEditProfileBtn");

    const closeModalBtn =
        document.getElementById("closeEditProfileBtn");

    const cancelModalBtn =
        document.getElementById("cancelEditProfileBtn");

    const modalOverlay =
        document.getElementById("modalOverlay");

    const modal =
        document.getElementById("editProfileModal");

    const saveProfileBtn =
        document.getElementById("saveProfileBtn");


    /* ========================================================
       FORM ELEMENTS
       ======================================================== */

    const editFirstName =
        document.getElementById("editFirstName");

    const editLastName =
        document.getElementById("editLastName");

    const editEmail =
        document.getElementById("editEmail");

    const editMobile =
        document.getElementById("editMobile");

    const editDesignation =
        document.getElementById("editDesignation");

    const editBranch =
        document.getElementById("editBranch");


    /* ========================================================
       IMAGE URL
       ======================================================== */

    function getImageUrl(imagePath) {

        if (!imagePath) {
            return "";
        }


        /*
         * Already complete URL
         */

        if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://")
        ) {

            return imagePath;

        }


        /*
         * Example backend response:
         *
         * /uploads/profile/profile_xxx.jpg
         */

        if (imagePath.startsWith("/")) {

            return `http://localhost:${BACKEND_PORT}${imagePath}`;

        }


        /*
         * Example:
         *
         * uploads/profile/profile_xxx.jpg
         */

        return `http://localhost:${BACKEND_PORT}/${imagePath}`;

    }


    /* ========================================================
       OPEN EDIT MODAL
       ======================================================== */

    function openEditProfile() {

        populateEditForm();

        if (modal) {

            modal.classList.add("active");

        }

        document.body.style.overflow = "hidden";

    }


    /* ========================================================
       CLOSE EDIT MODAL
       ======================================================== */

    function closeEditProfile() {

        if (modal) {

            modal.classList.remove("active");

        }

        document.body.style.overflow = "";

    }


    /* ========================================================
       BUTTON EVENTS
       ======================================================== */

    if (openModalBtn) {

        openModalBtn.addEventListener(
            "click",
            openEditProfile
        );

    }


    if (closeModalBtn) {

        closeModalBtn.addEventListener(
            "click",
            closeEditProfile
        );

    }


    if (cancelModalBtn) {

        cancelModalBtn.addEventListener(
            "click",
            closeEditProfile
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeEditProfile
        );

    }


    /* ========================================================
       ESC KEY
       ======================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("active")
            ) {

                closeEditProfile();

            }

        }
    );


    /* ========================================================
       POPULATE EDIT FORM
       ======================================================== */

    function populateEditForm() {

        const firstName =
            document.getElementById("firstName");

        const lastName =
            document.getElementById("lastName");

        const email =
            document.getElementById("email");

        const mobile =
            document.getElementById("mobile");

        const designation =
            document.getElementById("designation");

        const branch =
            document.getElementById("branch");


        if (editFirstName && firstName) {

            editFirstName.value =
                firstName.textContent.trim();

        }


        if (editLastName && lastName) {

            editLastName.value =
                lastName.textContent.trim();

        }


        if (editEmail && email) {

            editEmail.value =
                email.textContent.trim();

        }


        if (editMobile && mobile) {

            editMobile.value =
                mobile.textContent.trim();

        }


        if (editDesignation && designation) {

            editDesignation.value =
                designation.textContent.trim();

        }


        if (editBranch && branch) {

            editBranch.value =
                branch.textContent.trim();

        }

    }


    /* ========================================================
       LOAD EMPLOYEE PROFILE
       ======================================================== */

    async function loadEmployeeProfile() {

        try {

            /*
             * IMPORTANT:
             *
             * This should print:
             *
             * http://localhost:8082/api/employee/profile/5
             *
             * NOT:
             *
             * [object HTMLElement]
             */

            const profileUrl =
                `${API_BASE_URL}/profile/${employeeId}`;


            console.log(
                "Employee Profile URL:",
                profileUrl
            );


            const response =
                await fetch(profileUrl);


            console.log(
                "Profile HTTP Status:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    `HTTP Error ${response.status}`
                );

            }


            const result =
                await response.json();


            console.log(
                "Employee Profile API Response:",
                result
            );


            if (
                !result.status ||
                !result.data
            ) {

                throw new Error(
                    result.message ||
                    "Unable to load employee profile."
                );

            }


            displayEmployeeProfile(
                result.data
            );

        }
        catch (error) {

            console.error(
                "Profile loading error:",
                error
            );


            alert(
                "Unable to load employee profile."
            );

        }

    }


    /* ========================================================
       DISPLAY EMPLOYEE PROFILE
       ======================================================== */

    function displayEmployeeProfile(employee) {

        console.log(
            "Displaying employee:",
            employee
        );


        /* ====================================================
           EMPLOYEE ID
           ==================================================== */

        setText(
            "employeeId",
            employee.employeeId
        );

        setText(
            "profileEmployeeId",
            employee.employeeId
        );


        /* ====================================================
           FIRST NAME
           ==================================================== */

        setText(
            "firstName",
            employee.firstName
        );


        /* ====================================================
           LAST NAME
           ==================================================== */

        setText(
            "lastName",
            employee.lastName
        );


        /* ====================================================
           FULL NAME
           ==================================================== */

        const fullName =
            `${employee.firstName || ""} ${employee.lastName || ""}`
                .trim();


        setText(
            "profileFullName",
            fullName
        );


        setText(
            "fullName",
            fullName
        );


        /* ====================================================
           EMAIL
           ==================================================== */

        setText(
            "email",
            employee.email
        );


        setText(
            "profileEmail",
            employee.email
        );


        /* ====================================================
           MOBILE
           ==================================================== */

        setText(
            "mobile",
            employee.mobile
        );


        /* ====================================================
           DESIGNATION
           ==================================================== */

        setText(
            "designation",
            employee.designation
        );


        /* ====================================================
           BRANCH
           ==================================================== */

        setText(
            "branch",
            employee.branch
        );


        /* ====================================================
           SALARY
           ==================================================== */

        setText(
            "salary",
            employee.salary
        );


        /* ====================================================
           ROLE
           ==================================================== */

        setText(
            "role",
            employee.role
        );


        /* ====================================================
           ACCOUNT STATUS
           ==================================================== */

        setText(
            "accountStatus",
            employee.accountStatus
        );


        /* ====================================================
           PROFILE IMAGE
           ==================================================== */

        if (
            employee.profileImage &&
            profileImage
        ) {

            const imageUrl =
                getImageUrl(
                    employee.profileImage
                );


            console.log(
                "Employee Profile Image URL:",
                imageUrl
            );


            profileImage.src =
                imageUrl;

        }

    }


    /* ========================================================
       SET TEXT HELPER
       ======================================================== */

    function setText(id, value) {

        const element =
            document.getElementById(id);


        if (!element) {

            return;

        }


        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {

            element.textContent = "-";

        }
        else {

            element.textContent = value;

        }

    }


    /* ========================================================
       PROFILE PHOTO BUTTON
       ======================================================== */

    if (changePhotoBtn) {

        changePhotoBtn.addEventListener(
            "click",
            function () {

                if (profileImageInput) {

                    profileImageInput.click();

                }

            }
        );

    }


    /* ========================================================
       PROFILE PHOTO SELECT
       ======================================================== */

    if (profileImageInput) {

        profileImageInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];


                if (!file) {

                    return;

                }


                /* ============================================
                   VALID FILE TYPES
                   ============================================ */

                const allowedTypes = [
                    "image/jpeg",
                    "image/jpg",
                    "image/png"
                ];


                if (
                    !allowedTypes.includes(
                        file.type
                    )
                ) {

                    alert(
                        "Please select JPG, JPEG or PNG image."
                    );


                    this.value = "";


                    return;

                }


                /* ============================================
                   MAX FILE SIZE
                   ============================================ */

                const maxSize =
                    5 * 1024 * 1024;


                if (file.size > maxSize) {

                    alert(
                        "Profile image must be less than 5 MB."
                    );


                    this.value = "";


                    return;

                }


                /* ============================================
                   IMMEDIATE PREVIEW
                   ============================================ */

                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        if (profileImage) {

                            profileImage.src =
                                event.target.result;

                        }

                    };


                reader.readAsDataURL(file);


                /* ============================================
                   UPLOAD
                   ============================================ */

                uploadProfilePhoto(file);

            }

        );

    }


    /* ========================================================
       UPLOAD PROFILE PHOTO
       ======================================================== */

    async function uploadProfilePhoto(file) {

        try {

            const formData =
                new FormData();


            /*
             * IMPORTANT:
             *
             * This name must match your backend:
             *
             * @RequestParam("profileImage")
             */

            formData.append(
                "profileImage",
                file
            );


            const uploadUrl =
                `${API_BASE_URL}/profile/${employeeId}/photo`;


            console.log(
                "Employee Photo Upload URL:",
                uploadUrl
            );


            const response =
                await fetch(
                    uploadUrl,
                    {
                        method: "POST",
                        body: formData
                    }
                );


            console.log(
                "Photo Upload HTTP Status:",
                response.status
            );


            const result =
                await response.json();


            console.log(
                "Photo Upload Response:",
                result
            );


            if (
                !response.ok ||
                !result.status
            ) {

                throw new Error(
                    result.message ||
                    "Unable to upload profile photo."
                );

            }


            /*
             * Backend should return the image path
             * inside result.data.
             */

            if (
                result.data &&
                profileImage
            ) {

                const imageUrl =
                    getImageUrl(
                        result.data
                    );


                console.log(
                    "New Profile Image URL:",
                    imageUrl
                );


                /*
                 * Add timestamp to avoid browser cache.
                 */

                profileImage.src =
                    `${imageUrl}?t=${Date.now()}`;

            }


            alert(
                "Profile photo updated successfully."
            );

        }
        catch (error) {

            console.error(
                "Photo upload error:",
                error
            );


            alert(
                error.message ||
                "Unable to upload profile photo."
            );

        }

    }


    /* ========================================================
       SAVE PROFILE BUTTON
       ======================================================== */

    if (saveProfileBtn) {

        saveProfileBtn.addEventListener(
            "click",
            updateEmployeeProfile
        );

    }


    /* ========================================================
       UPDATE EMPLOYEE PROFILE
       ======================================================== */

    async function updateEmployeeProfile() {

        /*
         * Check form elements.
         */

        if (
            !editFirstName ||
            !editLastName ||
            !editEmail ||
            !editMobile ||
            !editDesignation ||
            !editBranch
        ) {

            console.error(
                "Employee edit form elements are missing."
            );


            return;

        }


        /* ====================================================
           VALIDATION
           ==================================================== */

        if (
            !editFirstName.value.trim() ||
            !editLastName.value.trim() ||
            !editEmail.value.trim() ||
            !editMobile.value.trim() ||
            !editDesignation.value.trim() ||
            !editBranch.value.trim()
        ) {

            alert(
                "Please fill all required employee information."
            );


            return;

        }


        /* ====================================================
           REQUEST BODY
           ==================================================== */

        const requestBody = {

            firstName:
                editFirstName.value.trim(),

            lastName:
                editLastName.value.trim(),

            email:
                editEmail.value.trim(),

            mobile:
                editMobile.value.trim(),

            designation:
                editDesignation.value.trim(),

            branch:
                editBranch.value.trim()

        };


        console.log(
            "Employee Profile Update Request:",
            requestBody
        );


        try {

            saveProfileBtn.disabled = true;


            saveProfileBtn.innerHTML =
                "Saving...";


            const updateUrl =
                `${API_BASE_URL}/profile/${employeeId}`;


            console.log(
                "Employee Profile Update URL:",
                updateUrl
            );


            const response =
                await fetch(
                    updateUrl,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                requestBody
                            )
                    }
                );


            const result =
                await response.json();


            console.log(
                "Employee Profile Update Response:",
                result
            );


            if (
                !response.ok ||
                !result.status
            ) {

                throw new Error(
                    result.message ||
                    "Employee profile update failed."
                );

            }


            /*
             * Backend returns updated EmployeeResponse.
             *
             * Use backend response instead of
             * manually guessing the updated values.
             */

            if (result.data) {

                displayEmployeeProfile(
                    result.data
                );

            }
            else {

                displayUpdatedProfile(
                    requestBody
                );

            }


            closeEditProfile();


            alert(
                "Employee profile updated successfully."
            );

        }
        catch (error) {

            console.error(
                "Employee profile update error:",
                error
            );


            alert(
                error.message ||
                "Unable to update employee profile."
            );

        }
        finally {

            saveProfileBtn.disabled = false;


            saveProfileBtn.innerHTML =
                "Save Changes";

        }

    }


    /* ========================================================
       DISPLAY UPDATED PROFILE
       ======================================================== */

    function displayUpdatedProfile(employee) {

        const fullName =
            `${employee.firstName || ""} ${employee.lastName || ""}`
                .trim();


        setText(
            "profileFullName",
            fullName
        );


        setText(
            "fullName",
            fullName
        );


        setText(
            "firstName",
            employee.firstName
        );


        setText(
            "lastName",
            employee.lastName
        );


        setText(
            "email",
            employee.email
        );


        setText(
            "profileEmail",
            employee.email
        );


        setText(
            "mobile",
            employee.mobile
        );


        setText(
            "designation",
            employee.designation
        );


        setText(
            "branch",
            employee.branch
        );

    }


    /* ========================================================
       INITIAL LOAD
       ======================================================== */

    loadEmployeeProfile();

});