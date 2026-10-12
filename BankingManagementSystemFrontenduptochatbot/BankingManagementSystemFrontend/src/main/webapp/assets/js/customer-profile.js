document.addEventListener("DOMContentLoaded", function () {

    const BACKEND_PORT = "8082";

    const API_BASE_URL =
        `http://localhost:${BACKEND_PORT}/api/customer`;

    /* =====================================================
       GET CUSTOMER ID
       ===================================================== */

    let customerId =
        sessionStorage.getItem("customerId");

    if (!customerId) {

        console.error(
            "Customer ID not found in sessionStorage."
        );

        alert(
            "Customer session not found. Please login again."
        );

        return;
    }

    customerId = String(customerId).trim();

    console.log("Customer ID:", customerId);


    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    const profileImage =
        document.getElementById("profileImage");

    const profileImageInput =
        document.getElementById("profileImageInput");

    const changePhotoBtn =
        document.getElementById("changePhotoBtn");

    const openEditProfileBtn =
        document.getElementById("openEditProfileBtn");

    const closeEditProfileBtn =
        document.getElementById("closeEditProfileBtn");

    const cancelEditProfileBtn =
        document.getElementById("cancelEditProfileBtn");

    const editProfileModal =
        document.getElementById("editProfileModal");

    const modalOverlay =
        document.getElementById("modalOverlay");

    const saveProfileBtn =
        document.getElementById("saveProfileBtn");


    /* =====================================================
       CUSTOMER EDIT FIELDS
       ===================================================== */

    const editFullName =
        document.getElementById("editFullName");

    const editEmail =
        document.getElementById("editEmail");

    const editMobile =
        document.getElementById("editMobile");

    const editDob =
        document.getElementById("editDob");

    const editGender =
        document.getElementById("editGender");

    const editAddress =
        document.getElementById("editAddress");

    const editCity =
        document.getElementById("editCity");

    const editState =
        document.getElementById("editState");

    const editPinCode =
        document.getElementById("editPinCode");


    /* =====================================================
       CURRENT CUSTOMER PROFILE
       ===================================================== */

    let currentProfile = null;


    /* =====================================================
       IMAGE URL
       ===================================================== */

    function getImageUrl(imagePath) {

        if (!imagePath) {
            return "";
        }

        if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://")
        ) {
            return imagePath;
        }

        if (imagePath.startsWith("/")) {

            return `http://localhost:${BACKEND_PORT}${imagePath}`;

        }

        return `http://localhost:${BACKEND_PORT}/${imagePath}`;
    }


    /* =====================================================
       LOAD CUSTOMER PROFILE
       ===================================================== */

    async function loadCustomerProfile() {

        try {

            const url =
                `${API_BASE_URL}/profile/${customerId}`;

            console.log(
                "Customer Profile URL:",
                url
            );

            const response =
                await fetch(url);

            console.log(
                "Customer Profile HTTP Status:",
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
                "Customer Profile API Response:",
                result
            );

            if (
                !result.status ||
                !result.data
            ) {

                throw new Error(
                    result.message ||
                    "Customer profile not found."
                );
            }

            currentProfile =
                result.data;

            displayCustomerProfile(
                currentProfile
            );

        }
        catch (error) {

            console.error(
                "Customer profile loading error:",
                error
            );

            alert(
                error.message ||
                "Unable to load customer profile."
            );
        }
    }


    /* =====================================================
       DISPLAY CUSTOMER PROFILE
       ===================================================== */

    function displayCustomerProfile(profile) {

        console.log(
            "Displaying customer:",
            profile
        );


        /* CUSTOMER ID */

        setText(
            "profileCustomerId",
            profile.customerId
        );


        /* FULL NAME */

        setText(
            "profileFullName",
            profile.fullName
        );

        setText(
            "fullName",
            profile.fullName
        );


        /* EMAIL */

        setText(
            "profileEmail",
            profile.email
        );

        setText(
            "email",
            profile.email
        );


        /* MOBILE */

        setText(
            "mobile",
            profile.mobile
        );


        /* DOB */

        setText(
            "dob",
            formatDate(profile.dob)
        );


        /* GENDER */

        setText(
            "gender",
            profile.gender
        );


        /* AADHAAR */

        setText(
            "aadhaarNumber",
            profile.aadhaarNo
        );


        /* PAN */

        setText(
            "panNumber",
            profile.panNo
        );


        /* KYC STATUS */

        setText(
            "kycStatus",
            profile.approvalStatus
        );


        /* ADDRESS */

        setText(
            "address",
            profile.address
        );


        /* CITY */

        setText(
            "city",
            profile.city
        );


        /* STATE */

        setText(
            "state",
            profile.state
        );


        /* PIN CODE */

        setText(
            "pinCode",
            profile.pinCode
        );


        /* PROFILE PHOTO */

        if (
            profile.profileImage &&
            profileImage
        ) {

            const imageUrl =
                getImageUrl(
                    profile.profileImage
                );

            console.log(
                "Customer Profile Image URL:",
                imageUrl
            );

            profileImage.src =
                `${imageUrl}?t=${Date.now()}`;
        }
    }


    /* =====================================================
       DATE FORMAT
       ===================================================== */

    function formatDate(dateValue) {

        if (!dateValue) {
            return "-";
        }

        try {

            const date =
                new Date(dateValue);

            if (isNaN(date.getTime())) {
                return dateValue;
            }

            return date.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );

        }
        catch (error) {

            return dateValue;
        }
    }


    /* =====================================================
       SET TEXT
       ===================================================== */

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


    /* =====================================================
       OPEN EDIT PROFILE
       ===================================================== */

    function openEditProfile() {

        if (!currentProfile) {

            console.warn(
                "Customer profile not loaded yet."
            );

            return;
        }

        populateEditForm();

        if (editProfileModal) {

            editProfileModal.classList.add(
                "active"
            );
        }

        document.body.style.overflow =
            "hidden";
    }


    /* =====================================================
       POPULATE EDIT FORM
       ===================================================== */

    function populateEditForm() {

        if (!currentProfile) {
            return;
        }

        if (editFullName) {
            editFullName.value =
                currentProfile.fullName || "";
        }

        if (editEmail) {
            editEmail.value =
                currentProfile.email || "";
        }

        if (editMobile) {
            editMobile.value =
                currentProfile.mobile || "";
        }

        if (editDob) {
            editDob.value =
                currentProfile.dob || "";
        }

        if (editGender) {
            editGender.value =
                currentProfile.gender || "";
        }

        if (editAddress) {
            editAddress.value =
                currentProfile.address || "";
        }

        if (editCity) {
            editCity.value =
                currentProfile.city || "";
        }

        if (editState) {
            editState.value =
                currentProfile.state || "";
        }

        if (editPinCode) {
            editPinCode.value =
                currentProfile.pinCode || "";
        }
    }


    /* =====================================================
       CLOSE EDIT PROFILE
       ===================================================== */

    function closeEditProfile() {

        if (editProfileModal) {

            editProfileModal.classList.remove(
                "active"
            );
        }

        document.body.style.overflow = "";
    }


    /* =====================================================
       EDIT BUTTON EVENTS
       ===================================================== */

    if (openEditProfileBtn) {

        openEditProfileBtn.addEventListener(
            "click",
            openEditProfile
        );
    }


    if (closeEditProfileBtn) {

        closeEditProfileBtn.addEventListener(
            "click",
            closeEditProfile
        );
    }


    if (cancelEditProfileBtn) {

        cancelEditProfileBtn.addEventListener(
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


    /* =====================================================
       ESC KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                editProfileModal &&
                editProfileModal.classList.contains(
                    "active"
                )
            ) {

                closeEditProfile();
            }
        }
    );


    /* =====================================================
       SAVE CUSTOMER PROFILE
       ===================================================== */

    if (saveProfileBtn) {

        saveProfileBtn.addEventListener(
            "click",
            updateCustomerProfile
        );
    }


    /* =====================================================
       UPDATE CUSTOMER PROFILE
       ===================================================== */

    async function updateCustomerProfile(event) {

        if (event) {
            event.preventDefault();
        }


        if (!editFullName || !editMobile) {

            console.error(
                "Customer edit form elements are missing."
            );

            return;
        }


        /* VALIDATION */

        if (
            !editFullName.value.trim() ||
            !editMobile.value.trim()
        ) {

            alert(
                "Please fill Full Name and Mobile Number."
            );

            return;
        }


        /* =================================================
           IMPORTANT

           Backend UpdateCustomerProfileRequest supports:

           fullName
           mobile
           address
           city
           state
           pinCode

           Email / DOB / Gender are NOT included in
           that request class.
           ================================================= */

        const requestBody = {

            fullName:
                editFullName.value.trim(),

            mobile:
                editMobile.value.trim(),

            address:
                editAddress
                    ? editAddress.value.trim()
                    : "",

            city:
                editCity
                    ? editCity.value.trim()
                    : "",

            state:
                editState
                    ? editState.value.trim()
                    : "",

            pinCode:
                editPinCode
                    ? editPinCode.value.trim()
                    : ""
        };


        console.log(
            "Customer Profile Update Request:",
            requestBody
        );


        try {

            saveProfileBtn.disabled = true;

            saveProfileBtn.innerHTML =
                "Saving...";


            const updateUrl =
                `${API_BASE_URL}/profile/${customerId}`;


            console.log(
                "Customer Profile Update URL:",
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


            console.log(
                "Update HTTP Status:",
                response.status
            );


            const result =
                await response.json();


            console.log(
                "Customer Update Response:",
                result
            );


            if (
                !response.ok ||
                !result.status
            ) {

                throw new Error(
                    result.message ||
                    "Customer profile update failed."
                );
            }


            /* RELOAD PROFILE FROM DATABASE */

            await loadCustomerProfile();


            closeEditProfile();


            alert(
                "Customer profile updated successfully."
            );

        }
        catch (error) {

            console.error(
                "Customer profile update error:",
                error
            );

            alert(
                error.message ||
                "Unable to update customer profile."
            );

        }
        finally {

            saveProfileBtn.disabled =
                false;

            saveProfileBtn.innerHTML =
                `<i class="fa-solid fa-check"></i> Save Changes`;
        }
    }


    /* =====================================================
       PROFILE PHOTO BUTTON
       ===================================================== */

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


    /* =====================================================
       PROFILE PHOTO SELECT
       ===================================================== */

    if (profileImageInput) {

        profileImageInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];

                if (!file) {
                    return;
                }


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


                const maxSize =
                    5 * 1024 * 1024;


                if (file.size > maxSize) {

                    alert(
                        "Profile image must be less than 5 MB."
                    );

                    this.value = "";

                    return;
                }


                /* PREVIEW */

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


                /* UPLOAD */

                uploadCustomerPhoto(file);
            }
        );
    }


    /* =====================================================
       UPLOAD CUSTOMER PROFILE PHOTO
       ===================================================== */

    async function uploadCustomerPhoto(file) {

        try {

            const formData =
                new FormData();


            formData.append(
                "profileImage",
                file
            );


            const uploadUrl =
                `${API_BASE_URL}/profile/${customerId}/photo`;


            console.log(
                "Customer Photo Upload URL:",
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


            const result =
                await response.json();


            console.log(
                "Customer Photo Upload Response:",
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


            if (
                result.data &&
                profileImage
            ) {

                const imageUrl =
                    getImageUrl(
                        result.data
                    );

                profileImage.src =
                    `${imageUrl}?t=${Date.now()}`;
            }


            /*
             * Refresh navbar photo immediately.
             *
             * customer-navbar.js loads independently,
             * therefore dispatch an event.
             */

            window.dispatchEvent(
                new CustomEvent(
                    "customerProfileUpdated",
                    {
                        detail: {
                            profileImage:
                                result.data
                        }
                    }
                )
            );


            alert(
                "Customer profile photo updated successfully."
            );

        }
        catch (error) {

            console.error(
                "Customer photo upload error:",
                error
            );

            alert(
                error.message ||
                "Unable to upload customer profile photo."
            );
        }
    }


    /* =====================================================
       INITIAL LOAD
       ===================================================== */

    loadCustomerProfile();

});