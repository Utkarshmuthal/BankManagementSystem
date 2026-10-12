document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // CONFIGURATION
    // =========================================================

    const BACKEND_PORT = "8082";
    const API_BASE_URL = `http://localhost:${BACKEND_PORT}/api/employee`;


    // =========================================================
    // GET LOGGED-IN EMPLOYEE ID
    // =========================================================

    const employeeId = sessionStorage.getItem("employeeId");

    if (!employeeId) {
        console.error("Employee ID not found in sessionStorage.");
        alert("Employee session expired. Please login again.");
        return;
    }

    console.log("Logged-in Employee ID:", employeeId);


    // =========================================================
    // API ENDPOINTS
    // =========================================================

    const PROFILE_API =
        `${API_BASE_URL}/profile/${employeeId}`;

    const UPDATE_PROFILE_API =
        `${API_BASE_URL}/profile/${employeeId}`;

    const PHOTO_API =
        `${API_BASE_URL}/profile/${employeeId}/photo`;

    console.log("Employee Profile API:", PROFILE_API);
    console.log("Employee Update API:", UPDATE_PROFILE_API);
    console.log("Employee Photo API:", PHOTO_API);


    // =========================================================
    // DOM ELEMENTS
    // =========================================================

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


    // Personal Information

    const firstName =
        document.getElementById("firstName");

    const lastName =
        document.getElementById("lastName");

    const mobile =
        document.getElementById("mobile");

    const email =
        document.getElementById("email");


    // Employment Information

    const employmentEmployeeId =
        document.getElementById("employmentEmployeeId");

    const designation =
        document.getElementById("designation");

    const branch =
        document.getElementById("branch");

    const salary =
        document.getElementById("salary");


    // Account Information

    const userId =
        document.getElementById("userId");

    const accountEmail =
        document.getElementById("accountEmail");

    const role =
        document.getElementById("role");

    const accountStatus =
        document.getElementById("accountStatus");


    // =========================================================
    // EDIT PROFILE ELEMENTS
    // =========================================================

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

    const editFirstName =
        document.getElementById("editFirstName");

    const editLastName =
        document.getElementById("editLastName");

    const editMobile =
        document.getElementById("editMobile");

    const saveProfileBtn =
        document.getElementById("saveProfileBtn");


    // =========================================================
    // PHOTO ELEMENTS
    // =========================================================

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


    // =========================================================
    // CURRENT EMPLOYEE
    // =========================================================

    let currentEmployee = null;


    // =========================================================
    // SET TEXT
    // =========================================================

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


    // =========================================================
    // IMAGE URL
    // =========================================================

    function getImageUrl(imagePath) {

        /*
         * If there is no image in database,
         * don't use default-profile.png.
         */
        if (!imagePath) {
            return null;
        }

        // Already complete URL
        if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://")
        ) {
            return imagePath;
        }

        // Backend relative path
        if (imagePath.startsWith("/")) {
            return `http://localhost:${BACKEND_PORT}${imagePath}`;
        }

        return `http://localhost:${BACKEND_PORT}/${imagePath}`;
    }


    // =========================================================
    // DISPLAY EMPLOYEE PROFILE
    // =========================================================

    function displayEmployeeProfile(employee) {

        if (!employee) {
            return;
        }

        console.log("Displaying Employee Profile:", employee);


        // =====================================================
        // FULL NAME
        // =====================================================

        const fullName =
            `${employee.firstName || ""} ${employee.lastName || ""}`
                .trim();


        // =====================================================
        // HEADER
        // =====================================================

        setText(employeeFullName, fullName);

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


        // =====================================================
        // PERSONAL INFORMATION
        // =====================================================

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


        // =====================================================
        // EMPLOYMENT INFORMATION
        // =====================================================

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


        if (
            employee.salary !== null &&
            employee.salary !== undefined
        ) {

            setText(
                salary,
                `₹ ${Number(employee.salary).toLocaleString("en-IN")}`
            );

        } else {

            setText(
                salary,
                "-"
            );
        }


        // =====================================================
        // ACCOUNT INFORMATION
        // =====================================================

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


        // =====================================================
        // EMPLOYEE PROFILE IMAGE
        // =====================================================

        if (
            employee.profileImage &&
            profileImage
        ) {

            const imageUrl =
                getImageUrl(employee.profileImage);

            const finalImageUrl =
                `${imageUrl}?t=${Date.now()}`;

            console.log(
                "Employee Profile Image:",
                finalImageUrl
            );

            profileImage.src =
                finalImageUrl;


            // If image cannot be loaded,
            // don't request default-profile.png.
            profileImage.onerror = function () {

                console.error(
                    "Unable to load employee profile image:",
                    imageUrl
                );

                this.onerror = null;
            };

        } else {

            console.log(
                "Employee has no profile image."
            );

            /*
             * Do NOT set default-profile.png.
             *
             * Keep existing image if available.
             */
        }


        // =====================================================
        // PHOTO PREVIEW
        // =====================================================

        if (
            photoPreview &&
            profileImage
        ) {

            photoPreview.src =
                profileImage.src;
        }
    }


    // =========================================================
    // LOAD EMPLOYEE PROFILE
    // =========================================================

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
                await fetch(
                    PROFILE_API,
                    {
                        method: "GET",

                        headers: {
                            "Accept":
                                "application/json"
                        },

                        credentials: "omit",

                        mode: "cors"
                    }
                );


            console.log(
                "Employee Profile HTTP Status:",
                response.status
            );


            const result =
                await response.json();


            console.log(
                "Employee Profile API Response:",
                result
            );


            if (
                !response.ok ||
                !result.status ||
                !result.data
            ) {

                throw new Error(
                    result.message ||
                    "Employee profile not found."
                );
            }


            currentEmployee =
                result.data;


            displayEmployeeProfile(
                currentEmployee
            );


        } catch (error) {

            console.error(
                "Employee profile loading error:",
                error
            );

            setText(
                employeeFullName,
                "Unable to load"
            );
        }
    }


    // =========================================================
    // OPEN EDIT PROFILE
    // =========================================================

    function openEditProfileModal() {

        if (!currentEmployee) {

            console.error(
                "Employee profile data not loaded."
            );

            return;
        }


        editFirstName.value =
            currentEmployee.firstName || "";

        editLastName.value =
            currentEmployee.lastName || "";

        editMobile.value =
            currentEmployee.mobile || "";


        editProfileModal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";
    }


    // =========================================================
    // CLOSE EDIT PROFILE
    // =========================================================

    function closeEditProfileModal() {

        if (editProfileModal) {

            editProfileModal.classList.remove(
                "active"
            );
        }

        document.body.style.overflow =
            "";
    }


    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            openEditProfileModal
        );
    }


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


    // =========================================================
    // UPDATE EMPLOYEE PROFILE
    // =========================================================

    if (editProfileForm) {

        editProfileForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                await updateEmployeeProfile();
            }
        );
    }


    async function updateEmployeeProfile() {

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

            return;
        }


        if (!newLastName) {

            alert(
                "Please enter last name."
            );

            return;
        }


        if (!/^[0-9]{10,15}$/.test(newMobile)) {

            alert(
                "Please enter a valid mobile number."
            );

            return;
        }


        const requestBody = {

            firstName:
                newFirstName,

            lastName:
                newLastName,

            mobile:
                newMobile
        };


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

                        credentials: "omit",

                        mode: "cors",

                        body:
                            JSON.stringify(
                                requestBody
                            )
                    }
                );


            const result =
                await response.json();


            if (
                !response.ok ||
                !result.status
            ) {

                throw new Error(
                    result.message ||
                    "Unable to update employee profile."
                );
            }


            closeEditProfileModal();

            await loadEmployeeProfile();


            alert(
                "Profile updated successfully."
            );


        } catch (error) {

            console.error(
                "Employee profile update error:",
                error
            );

            alert(
                error.message ||
                "Unable to update employee profile."
            );


        } finally {

            if (saveProfileBtn) {

                saveProfileBtn.disabled =
                    false;

                saveProfileBtn.textContent =
                    "Save Changes";
            }
        }
    }


    // =========================================================
    // OPEN PHOTO MODAL
    // =========================================================

    if (changePhotoBtn) {

        changePhotoBtn.addEventListener(
            "click",
            function () {

                if (photoError) {

                    photoError.textContent =
                        "";
                }


                if (profilePhotoInput) {

                    profilePhotoInput.value =
                        "";
                }


                if (
                    photoPreview &&
                    profileImage
                ) {

                    photoPreview.src =
                        profileImage.src;
                }


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


    // =========================================================
    // CLOSE PHOTO MODAL
    // =========================================================

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


    // =========================================================
    // PHOTO SELECT
    // =========================================================

    if (profilePhotoInput) {

        profilePhotoInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];


                if (!file) {
                    return;
                }


                if (photoError) {

                    photoError.textContent =
                        "";
                }


                // =================================================
                // ALLOWED FILE TYPES
                // =================================================

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

                    this.value = "";

                    return;
                }


                // =================================================
                // FILE SIZE
                // =================================================

                const maxSize =
                    5 * 1024 * 1024;


                if (file.size > maxSize) {

                    showPhotoError(
                        "Profile photo must be less than 5 MB."
                    );

                    this.value = "";

                    return;
                }


                // =================================================
                // PREVIEW
                // =================================================

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


    // =========================================================
    // PHOTO ERROR
    // =========================================================

    function showPhotoError(message) {

        if (photoError) {

            photoError.textContent =
                message;
        }


        console.error(
            "PHOTO ERROR:",
            message
        );
    }


    // =========================================================
    // UPLOAD BUTTON
    // =========================================================

    if (uploadPhotoBtn) {

        uploadPhotoBtn.addEventListener(
            "click",
            uploadEmployeePhoto
        );
    }


    // =========================================================
    // UPLOAD EMPLOYEE PHOTO
    // =========================================================

    async function uploadEmployeePhoto() {

        console.log(
            "======================================"
        );

        console.log(
            "EMPLOYEE PHOTO UPLOAD START"
        );


        // =====================================================
        // CHECK SESSION AGAIN
        // =====================================================

        const currentEmployeeId =
            sessionStorage.getItem("employeeId");


        console.log(
            "Session Employee ID:",
            currentEmployeeId
        );


        if (!currentEmployeeId) {

            showPhotoError(
                "Employee session expired. Please login again."
            );

            return;
        }


        if (
            String(currentEmployeeId) !==
            String(employeeId)
        ) {

            console.error(
                "Employee ID mismatch.",
                {
                    originalEmployeeId:
                        employeeId,

                    sessionEmployeeId:
                        currentEmployeeId
                }
            );


            showPhotoError(
                "Invalid employee session."
            );

            return;
        }


        // =====================================================
        // FILE CHECK
        // =====================================================

        if (!profilePhotoInput) {

            showPhotoError(
                "Photo input not found."
            );

            return;
        }


        const file =
            profilePhotoInput.files[0];


        if (!file) {

            showPhotoError(
                "Please select a profile photo."
            );

            return;
        }


        // =====================================================
        // FILE TYPE
        // =====================================================

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


        // =====================================================
        // FILE SIZE
        // =====================================================

        const maxSize =
            5 * 1024 * 1024;


        if (file.size > maxSize) {

            showPhotoError(
                "Profile photo must be less than 5 MB."
            );

            return;
        }


        // =====================================================
        // FORM DATA
        // =====================================================

        const formData =
            new FormData();


        formData.append(
            "profileImage",
            file
        );


        console.log(
            "Employee Photo API:",
            PHOTO_API
        );

        console.log(
            "Employee ID:",
            currentEmployeeId
        );

        console.log(
            "File:",
            file.name
        );

        console.log(
            "File size:",
            file.size
        );


        // =====================================================
        // BUTTON
        // =====================================================

        if (uploadPhotoBtn) {

            uploadPhotoBtn.disabled =
                true;

            uploadPhotoBtn.textContent =
                "Uploading...";
        }


        try {

            // =================================================
            // EMPLOYEE PHOTO API
            // =================================================

            const response =
                await fetch(
                    PHOTO_API,
                    {
                        method: "POST",

                        /*
                         * DO NOT manually set Content-Type.
                         * Browser creates multipart boundary.
                         */

                        body: formData,

                        credentials: "omit",

                        mode: "cors",

                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            console.log(
                "Employee Photo HTTP Status:",
                response.status
            );


            const responseText =
                await response.text();


            console.log(
                "Raw Server Response:",
                responseText
            );


            let result;


            try {

                result =
                    JSON.parse(
                        responseText
                    );

            } catch (parseError) {

                throw new Error(
                    "Server returned an invalid response."
                );
            }


            console.log(
                "Employee Photo API Response:",
                result
            );


            // =================================================
            // HTTP ERROR
            // =================================================

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    `Employee photo upload failed. HTTP ${response.status}`
                );
            }


            // =================================================
            // API ERROR
            // =================================================

            if (!result.status) {

                throw new Error(
                    result.message ||
                    "Unable to upload employee photo."
                );
            }


            // =================================================
            // GET IMAGE PATH
            // =================================================

            let imagePath = null;


            if (
                typeof result.data === "string"
            ) {

                imagePath =
                    result.data;

            } else if (
                result.data &&
                typeof result.data === "object"
            ) {

                imagePath =
                    result.data.profileImage ||
                    result.data.imagePath ||
                    result.data.profilePhoto;
            }


            console.log(
                "Employee Image Path:",
                imagePath
            );


            // =================================================
            // UPDATE IMAGE
            // =================================================

            if (imagePath) {

                const imageUrl =
                    getImageUrl(
                        imagePath
                    );


                const finalImageUrl =
                    `${imageUrl}?t=${Date.now()}`;


                console.log(
                    "New Employee Image URL:",
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


                // Update current employee object
                if (currentEmployee) {

                    currentEmployee.profileImage =
                        imagePath;
                }
            }


            // =================================================
            // CLOSE MODAL
            // =================================================

            closePhotoUploadModal();


            profilePhotoInput.value =
                "";


            // =================================================
            // RELOAD EMPLOYEE PROFILE
            // =================================================

            await loadEmployeeProfile();


            alert(
                "Employee profile photo updated successfully."
            );


        } catch (error) {

            console.error(
                "======================================"
            );

            console.error(
                "EMPLOYEE PHOTO UPLOAD ERROR"
            );

            console.error(
                error
            );

            console.error(
                "======================================"
            );


            if (
                error instanceof TypeError &&
                error.message === "Failed to fetch"
            ) {

                showPhotoError(
                    "Employee photo upload request was blocked by the browser. Check the backend response/CORS configuration."
                );

            } else {

                showPhotoError(
                    error.message ||
                    "Unable to upload employee profile photo."
                );
            }


        } finally {

            if (uploadPhotoBtn) {

                uploadPhotoBtn.disabled =
                    false;

                uploadPhotoBtn.textContent =
                    "Upload Photo";
            }
        }
    }


    // =========================================================
    // ESC KEY
    // =========================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeEditProfileModal();

                closePhotoUploadModal();
            }
        }
    );


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    loadEmployeeProfile();

});