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

    /*
     * IMPORTANT:
     * Employee ID must be the employee_id from employee table.
     *
     * Example:
     * employee_id = 5
     */

    let employeeId =
        sessionStorage.getItem("employeeId");

    /*
     * Temporary fallback for testing.
     *
     * REMOVE THIS after employeeId is stored during login.
     */

    if (!employeeId) {

        employeeId = "5";

        console.warn(
            "employeeId not found in sessionStorage. Using employeeId = 5 for testing."
        );
    }

    console.log(
        "Employee ID:",
        employeeId
    );


    /* ========================================================
       API ENDPOINTS
       ======================================================== */

    const PROFILE_API =
        `${API_BASE_URL}/profile/${employeeId}`;

    const UPDATE_PROFILE_API =
        `${API_BASE_URL}/profile/${employeeId}`;

    const PHOTO_API =
        `${API_BASE_URL}/profile/${employeeId}/photo`;


    console.log("Profile API:", PROFILE_API);
    console.log("Update API:", UPDATE_PROFILE_API);
    console.log("Photo API:", PHOTO_API);


    /* ========================================================
       DEFAULT IMAGE
       ======================================================== */

    const DEFAULT_IMAGE =
        "/BankingManagementSystemFrontend/assets/images/default-profile.png";


    /* ========================================================
       DOM ELEMENTS
       ======================================================== */

    const profileImage =
        document.getElementById("profileImage");

    const employeeFullName =
        document.getElementById("employeeFullName");

    const employeeIdElement =
        document.getElementById("employeeId");

    const employeeDesignation =
        document.getElementById("employeeDesignation");

    const employeeBranch =
        document.getElementById("employeeBranch");

    const employeeStatus =
        document.getElementById("employeeStatus");


    /* ========================================================
       PERSONAL INFORMATION ELEMENTS
       ======================================================== */

    const firstName =
        document.getElementById("firstName");

    const lastName =
        document.getElementById("lastName");

    const mobile =
        document.getElementById("mobile");

    const email =
        document.getElementById("email");


    /* ========================================================
       EMPLOYMENT INFORMATION
       ======================================================== */

    const employmentEmployeeId =
        document.getElementById("employmentEmployeeId");

    const designation =
        document.getElementById("designation");

    const branch =
        document.getElementById("branch");

    const salary =
        document.getElementById("salary");


    /* ========================================================
       ACCOUNT INFORMATION
       ======================================================== */

    const userId =
        document.getElementById("userId");

    const accountEmail =
        document.getElementById("accountEmail");

    const role =
        document.getElementById("role");

    const accountStatus =
        document.getElementById("accountStatus");


    /* ========================================================
       EDIT PROFILE MODAL
       ======================================================== */

    const editProfileBtn =
        document.getElementById("editProfileBtn");

    const editProfileModal =
        document.getElementById("editProfileModal");

    const closeEditModal =
        document.getElementById("closeEditModal");

    const cancelEditBtn =
        document.getElementById("cancelEditBtn");

    const editProfileForm =
        document.getElementById("editProfileForm");


    /* ========================================================
       EDIT FORM INPUTS
       ======================================================== */

    const editFirstName =
        document.getElementById("editFirstName");

    const editLastName =
        document.getElementById("editLastName");

    const editMobile =
        document.getElementById("editMobile");

    const saveProfileBtn =
        document.getElementById("saveProfileBtn");


    /* ========================================================
       PHOTO MODAL
       ======================================================== */

    const changePhotoBtn =
        document.getElementById("changePhotoBtn");

    const photoModal =
        document.getElementById("photoModal");

    const closePhotoModal =
        document.getElementById("closePhotoModal");

    const cancelPhotoBtn =
        document.getElementById("cancelPhotoBtn");

    const profilePhotoInput =
        document.getElementById("profilePhotoInput");

    const photoPreview =
        document.getElementById("photoPreview");

    const uploadPhotoBtn =
        document.getElementById("uploadPhotoBtn");

    const photoError =
        document.getElementById("photoError");


    /* ========================================================
       CHECK IMPORTANT ELEMENTS
       ======================================================== */

    console.log("Profile image:", profileImage);
    console.log("Edit button:", editProfileBtn);
    console.log("Edit modal:", editProfileModal);
    console.log("Photo button:", changePhotoBtn);
    console.log("Photo modal:", photoModal);


    /* ========================================================
       UTILITY - SET TEXT
       ======================================================== */

    function setText(element, value) {

        if (!element) {
            return;
        }

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {

            element.textContent = "-";

        } else {

            element.textContent = value;

        }
    }


    /* ========================================================
       UTILITY - IMAGE URL
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
         * Backend returns:
         *
         * /uploads/profile/abc.jpg
         */

        if (imagePath.startsWith("/")) {

            return (
                `http://localhost:${BACKEND_PORT}` +
                imagePath
            );

        }


        /*
         * Backend returns:
         *
         * uploads/profile/abc.jpg
         */

        return (
            `http://localhost:${BACKEND_PORT}/` +
            imagePath
        );
    }


    /* ========================================================
       LOAD EMPLOYEE PROFILE
       ======================================================== */

    async function loadEmployeeProfile() {

        console.log(
            "Loading employee profile..."
        );

        console.log(
            "Request URL:",
            PROFILE_API
        );


        try {

            const response =
                await fetch(PROFILE_API, {

                    method: "GET",

                    headers: {
                        "Accept": "application/json"
                    }

                });


            console.log(
                "HTTP Status:",
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
                    "Employee profile not found."
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


            /*
             * Do not show alert during initial page load.
             *
             * This avoids annoying alerts when debugging.
             */

            setText(
                employeeFullName,
                "Unable to load"
            );

            setText(
                employeeDesignation,
                "-"
            );

            setText(
                employeeBranch,
                "-"
            );

            setText(
                employeeStatus,
                "-"
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
           BASIC HEADER
           ==================================================== */

        const fullName =
            `${employee.firstName || ""} ${employee.lastName || ""}`
                .trim();


        setText(
            employeeFullName,
            fullName
        );


        setText(
            employeeIdElement,
            employee.employeeId
        );


        setText(
            employeeDesignation,
            employee.designation
        );


        setText(
            employeeBranch,
            employee.branch
        );


        setText(
            employeeStatus,
            employee.accountStatus
        );


        /* ====================================================
           PERSONAL INFORMATION
           ==================================================== */

        setText(
            firstName,
            employee.firstName
        );


        setText(
            lastName,
            employee.lastName
        );


        setText(
            mobile,
            employee.mobile
        );


        setText(
            email,
            employee.email
        );


        /* ====================================================
           EMPLOYMENT INFORMATION
           ==================================================== */

        setText(
            employmentEmployeeId,
            employee.employeeId
        );


        setText(
            designation,
            employee.designation
        );


        setText(
            branch,
            employee.branch
        );


        setText(
            salary,
            employee.salary
        );


        /* ====================================================
           ACCOUNT INFORMATION
           ==================================================== */

        setText(
            userId,
            employee.userId
        );


        setText(
            accountEmail,
            employee.email
        );


        setText(
            role,
            employee.role
        );


        setText(
            accountStatus,
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
                "Profile Image URL:",
                imageUrl
            );


            profileImage.src =
                imageUrl;


            profileImage.onerror =
                function () {

                    console.error(
                        "Unable to load profile image:",
                        imageUrl
                    );

                    this.src =
                        DEFAULT_IMAGE;
                };

        }
        else {

            console.log(
                "Employee has no profile image."
            );

            if (profileImage) {

                profileImage.src =
                    DEFAULT_IMAGE;

            }
        }


        /*
         * Also update photo preview
         */

        if (photoPreview && profileImage) {

            photoPreview.src =
                profileImage.src;

        }
    }


    /* ========================================================
       OPEN EDIT PROFILE MODAL
       ======================================================== */

    function openEditProfileModal() {

        console.log(
            "Opening Edit Profile modal..."
        );


        /*
         * Get current values from page
         */

        const currentFirstName =
            firstName ?
            firstName.textContent.trim() :
            "";

        const currentLastName =
            lastName ?
            lastName.textContent.trim() :
            "";

        const currentMobile =
            mobile ?
            mobile.textContent.trim() :
            "";


        /*
         * Put values into form
         */

        if (editFirstName) {

            editFirstName.value =
                currentFirstName === "-" ?
                "" :
                currentFirstName;
        }


        if (editLastName) {

            editLastName.value =
                currentLastName === "-" ?
                "" :
                currentLastName;
        }


        if (editMobile) {

            editMobile.value =
                currentMobile === "-" ?
                "" :
                currentMobile;
        }


        /*
         * Open modal
         */

        if (editProfileModal) {

            editProfileModal.classList.add(
                "active"
            );

        }


        document.body.style.overflow =
            "hidden";
    }


    /* ========================================================
       CLOSE EDIT PROFILE MODAL
       ======================================================== */

    function closeEditProfileModal() {

        if (editProfileModal) {

            editProfileModal.classList.remove(
                "active"
            );

        }

        document.body.style.overflow =
            "";
    }


    /* ========================================================
       EDIT PROFILE BUTTON
       ======================================================== */

    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            openEditProfileModal
        );

    }


    /* ========================================================
       CLOSE EDIT MODAL
       ======================================================== */

    if (closeEditModal) {

        closeEditModal.addEventListener(
            "click",
            closeEditProfileModal
        );

    }


    if (cancelEditBtn) {

        cancelEditBtn.addEventListener(
            "click",
            closeEditProfileModal
        );

    }


    /* ========================================================
       SAVE / UPDATE PROFILE
       ======================================================== */

    if (editProfileForm) {

        editProfileForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                await updateEmployeeProfile();

            }
        );

    }


    /* ========================================================
       UPDATE EMPLOYEE PROFILE API
       ======================================================== */

    async function updateEmployeeProfile() {

        console.log(
            "Updating employee profile..."
        );


        /* ====================================================
           VALIDATION
           ==================================================== */

        if (!editFirstName ||
            !editLastName ||
            !editMobile) {

            console.error(
                "Edit form elements not found."
            );

            return;
        }


        const newFirstName =
            editFirstName.value.trim();

        const newLastName =
            editLastName.value.trim();

        const newMobile =
            editMobile.value.trim();


        if (!newFirstName) {

            alert(
                "Please enter first name."
            );

            editFirstName.focus();

            return;
        }


        if (!newLastName) {

            alert(
                "Please enter last name."
            );

            editLastName.focus();

            return;
        }


        if (!newMobile) {

            alert(
                "Please enter mobile number."
            );

            editMobile.focus();

            return;
        }


        /*
         * Mobile validation
         */

        if (!/^[0-9]{10,15}$/.test(newMobile)) {

            alert(
                "Please enter a valid mobile number."
            );

            editMobile.focus();

            return;
        }


        /* ====================================================
           REQUEST BODY
           ==================================================== */

        const requestBody = {

            firstName:
                newFirstName,

            lastName:
                newLastName,

            mobile:
                newMobile
        };


        console.log(
            "Update Request Body:",
            requestBody
        );


        /* ====================================================
           BUTTON LOADING
           ==================================================== */

        if (saveProfileBtn) {

            saveProfileBtn.disabled =
                true;

            saveProfileBtn.textContent =
                "Saving...";

        }


        try {

            const response =
                await fetch(
                    UPDATE_PROFILE_API,
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                requestBody
                            )
                    }
                );


            console.log(
                "Update HTTP Status:",
                response.status
            );


            const result =
                await response.json();


            console.log(
                "Update Profile Response:",
                result
            );


            if (
                !response.ok ||
                !result.status
            ) {

                throw new Error(
                    result.message ||
                    "Unable to update employee profile."
                );

            }


            /*
             * Update UI immediately
             */

            displayUpdatedEmployeeProfile(
                result.data ||
                requestBody
            );


            closeEditProfileModal();


            alert(
                "Profile updated successfully."
            );


        }
        catch (error) {

            console.error(
                "Profile update error:",
                error
            );


            alert(
                error.message ||
                "Unable to update employee profile."
            );

        }
        finally {

            if (saveProfileBtn) {

                saveProfileBtn.disabled =
                    false;

                saveProfileBtn.textContent =
                    "Save Changes";

            }
        }
    }


    /* ========================================================
       DISPLAY UPDATED PROFILE
       ======================================================== */

    function displayUpdatedEmployeeProfile(data) {

        console.log(
            "Updating profile UI:",
            data
        );


        setText(
            firstName,
            data.firstName
        );


        setText(
            lastName,
            data.lastName
        );


        setText(
            mobile,
            data.mobile
        );


        /*
         * Update full name
         */

        const fullName =
            `${data.firstName || ""} ${data.lastName || ""}`
                .trim();


        setText(
            employeeFullName,
            fullName
        );


        /*
         * Email remains unchanged.
         */

        /*
         * If backend returns complete EmployeeResponse,
         * update other fields as well.
         */

        if (data.employeeId !== undefined) {

            setText(
                employeeIdElement,
                data.employeeId
            );

            setText(
                employmentEmployeeId,
                data.employeeId
            );
        }


        if (data.designation !== undefined) {

            setText(
                designation,
                data.designation
            );

            setText(
                employeeDesignation,
                data.designation
            );
        }


        if (data.branch !== undefined) {

            setText(
                branch,
                data.branch
            );

            setText(
                employeeBranch,
                data.branch
            );
        }


        if (data.salary !== undefined) {

            setText(
                salary,
                data.salary
            );
        }


        if (data.email !== undefined) {

            setText(
                email,
                data.email
            );

            setText(
                accountEmail,
                data.email
            );
        }


        if (data.role !== undefined) {

            setText(
                role,
                data.role
            );
        }


        if (data.accountStatus !== undefined) {

            setText(
                accountStatus,
                data.accountStatus
            );

            setText(
                employeeStatus,
                data.accountStatus
            );
        }
    }


    /* ========================================================
       OPEN PHOTO MODAL
       ======================================================== */

    if (changePhotoBtn) {

        changePhotoBtn.addEventListener(
            "click",
            function () {

                console.log(
                    "Opening Change Photo modal..."
                );


                /*
                 * Reset previous error
                 */

                if (photoError) {

                    photoError.textContent =
                        "";

                }


                /*
                 * Reset file input
                 */

                if (profilePhotoInput) {

                    profilePhotoInput.value =
                        "";

                }


                /*
                 * Show current image in preview
                 */

                if (
                    photoPreview &&
                    profileImage
                ) {

                    photoPreview.src =
                        profileImage.src;

                }


                /*
                 * Open modal
                 */

                if (photoModal) {

                    photoModal.classList.add(
                        "active"
                    );

                }


                document.body.style.overflow =
                    "hidden";
            }
        );
    }


    /* ========================================================
       CLOSE PHOTO MODAL
       ======================================================== */

    function closePhotoUploadModal() {

        if (photoModal) {

            photoModal.classList.remove(
                "active"
            );

        }

        document.body.style.overflow =
            "";
    }


    if (closePhotoModal) {

        closePhotoModal.addEventListener(
            "click",
            closePhotoUploadModal
        );

    }


    if (cancelPhotoBtn) {

        cancelPhotoBtn.addEventListener(
            "click",
            closePhotoUploadModal
        );

    }


    /* ========================================================
       PHOTO SELECT
       ======================================================== */

    if (profilePhotoInput) {

        profilePhotoInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];


                if (!file) {

                    return;
                }


                console.log(
                    "Selected photo:",
                    file
                );


                /* =================================================
                   CLEAR OLD ERROR
                   ================================================= */

                if (photoError) {

                    photoError.textContent =
                        "";

                }


                /* =================================================
                   FILE TYPE VALIDATION
                   ================================================= */

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

                    showPhotoError(
                        "Please select JPG, JPEG or PNG image."
                    );

                    this.value =
                        "";

                    return;
                }


                /* =================================================
                   FILE SIZE VALIDATION
                   JSP says maximum 2 MB
                   ================================================= */

                const maxSize =
                    2 * 1024 * 1024;


                if (
                    file.size >
                    maxSize
                ) {

                    showPhotoError(
                        "Profile photo must be less than 2 MB."
                    );

                    this.value =
                        "";

                    return;
                }


                /* =================================================
                   PREVIEW IMAGE
                   ================================================= */

                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        if (photoPreview) {

                            photoPreview.src =
                                event.target.result;

                        }

                    };


                reader.readAsDataURL(file);

            }
        );
    }


    /* ========================================================
       PHOTO ERROR
       ======================================================== */

    function showPhotoError(message) {

        if (photoError) {

            photoError.textContent =
                message;

        }

        console.error(
            message
        );
    }


    /* ========================================================
       UPLOAD PHOTO
       ======================================================== */

    if (uploadPhotoBtn) {

        uploadPhotoBtn.addEventListener(
            "click",
            uploadEmployeePhoto
        );

    }


    /* ========================================================
       UPLOAD EMPLOYEE PHOTO API
       ======================================================== */

    async function uploadEmployeePhoto() {

        console.log(
            "Uploading employee profile photo..."
        );


        if (!profilePhotoInput) {

            console.error(
                "profilePhotoInput not found."
            );

            return;
        }


        const file =
            profilePhotoInput.files[0];


        /* ====================================================
           FILE CHECK
           ==================================================== */

        if (!file) {

            showPhotoError(
                "Please select a profile photo."
            );

            return;
        }


        /* ====================================================
           FILE TYPE CHECK
           ==================================================== */

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

            showPhotoError(
                "Please select JPG, JPEG or PNG image."
            );

            return;
        }


        /* ====================================================
           FILE SIZE CHECK
           ==================================================== */

        const maxSize =
            2 * 1024 * 1024;


        if (
            file.size >
            maxSize
        ) {

            showPhotoError(
                "Profile photo must be less than 2 MB."
            );

            return;
        }


        /* ====================================================
           FORM DATA
           ==================================================== */

        const formData =
            new FormData();


        /*
         * IMPORTANT:
         *
         * This name must match your backend
         * @RequestParam name.
         *
         * If your controller uses:
         *
         * @RequestParam("profileImage") MultipartFile file
         *
         * keep profileImage.
         */

        formData.append(
            "profileImage",
            file
        );


        console.log(
            "Photo API:",
            PHOTO_API
        );


        /* ====================================================
           BUTTON LOADING
           ==================================================== */

        if (uploadPhotoBtn) {

            uploadPhotoBtn.disabled =
                true;

            uploadPhotoBtn.textContent =
                "Uploading...";

        }


        try {

            const response =
                await fetch(
                    PHOTO_API,
                    {

                        method: "POST",

                        body:
                            formData

                    }
                );


            console.log(
                "Photo upload HTTP status:",
                response.status
            );


            const result =
                await response.json();


            console.log(
                "Photo upload response:",
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


            /* =================================================
               GET IMAGE PATH
               ================================================= */

            let imagePath = null;


            /*
             * Backend may return:
             *
             * data:
             * "/uploads/profile/abc.jpg"
             */

            if (
                typeof result.data ===
                "string"
            ) {

                imagePath =
                    result.data;

            }


            /*
             * Backend may return:
             *
             * data:
             * {
             *   profileImage: "/uploads/..."
             * }
             */

            else if (
                result.data &&
                typeof result.data ===
                "object"
            ) {

                imagePath =
                    result.data.profileImage ||
                    result.data.imagePath ||
                    result.data.profilePhoto;

            }


            console.log(
                "Returned image path:",
                imagePath
            );


            /* =================================================
               UPDATE IMAGE
               ================================================= */

            if (imagePath) {

                const imageUrl =
                    getImageUrl(
                        imagePath
                    );


                /*
                 * Cache buster
                 *
                 * Prevent browser from displaying
                 * an old cached image.
                 */

                const finalImageUrl =
                    `${imageUrl}?t=${Date.now()}`;


                console.log(
                    "Final image URL:",
                    finalImageUrl
                );


                if (profileImage) {

                    profileImage.src =
                        finalImageUrl;

                }


                if (photoPreview) {

                    photoPreview.src =
                        finalImageUrl;

                }

            }
            else {

                /*
                 * If backend does not return image path,
                 * reload complete profile.
                 */

                await loadEmployeeProfile();

            }


            /* =================================================
               CLOSE MODAL
               ================================================= */

            closePhotoUploadModal();


            /*
             * Clear file
             */

            profilePhotoInput.value =
                "";


            alert(
                "Profile photo updated successfully."
            );


        }
        catch (error) {

            console.error(
                "Photo upload error:",
                error
            );


            showPhotoError(
                error.message ||
                "Unable to upload profile photo."
            );

        }
        finally {

            if (uploadPhotoBtn) {

                uploadPhotoBtn.disabled =
                    false;

                uploadPhotoBtn.textContent =
                    "Upload Photo";

            }
        }
    }


    /* ========================================================
       ESC KEY
       ======================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeEditProfileModal();

                closePhotoUploadModal();

            }
        }
    );


    /* ========================================================
       INITIAL PROFILE LOAD
       ======================================================== */

    loadEmployeeProfile();

});