document.addEventListener("DOMContentLoaded", function () {

    const BACKEND_PORT = "8082";

    const API_BASE_URL =
        window.location.port === BACKEND_PORT
            ? "/api/customer"
            : `http://localhost:${BACKEND_PORT}/api/customer`;


    /* =====================================================
       GET CUSTOMER ID
    ===================================================== */

    const customerId =
        sessionStorage.getItem("customerId");


    if (!customerId) {

        console.warn("Customer ID not found in sessionStorage.");

        return;
    }


    /* =====================================================
       LOAD CUSTOMER PROFILE
    ===================================================== */

    loadNavbarProfile(customerId);


    async function loadNavbarProfile(customerId) {

        try {

            const response = await fetch(
                `${API_BASE_URL}/profile/${customerId}`
            );


            if (!response.ok) {

                throw new Error(
                    `Profile API failed: ${response.status}`
                );
            }


            const result = await response.json();


            console.log("Navbar Profile API Response:", result);


            if (!result.status || !result.data) {

                console.warn(
                    "Profile data not available."
                );

                return;
            }


            const profile = result.data;


            /* =================================================
               CUSTOMER NAME
            ================================================= */

            const customerName =
                document.getElementById("customerName");


            if (customerName) {

                customerName.textContent =
                    profile.fullName || "Customer";
            }


            /* =================================================
               PROFILE PHOTO
            ================================================= */

            setNavbarProfilePhoto(
                profile.fullName,
                profile.profileImage
            );

        }
        catch (error) {

            console.error(
                "Error loading navbar profile:",
                error
            );
        }
    }


    /* =====================================================
       SET NAVBAR PROFILE PHOTO
    ===================================================== */

    function setNavbarProfilePhoto(
        fullName,
        profileImage
    ) {

        const photo =
            document.getElementById(
                "navbarProfilePhoto"
            );


        const initials =
            document.getElementById(
                "navbarProfileInitials"
            );


        if (!photo || !initials) {

            console.warn(
                "Navbar photo elements not found."
            );

            return;
        }


        /* =================================================
           NO PROFILE PHOTO
        ================================================= */

        if (!profileImage ||
            profileImage.trim() === "") {

            showInitials(fullName);

            return;
        }


        /* =================================================
           BUILD IMAGE URL
        ================================================= */

        let imageUrl = profileImage;


        /*
         * Backend returns:
         *
         * /uploads/profile/profile_xxx.jpeg
         *
         * Convert it to:
         *
         * http://localhost:8082/uploads/profile/profile_xxx.jpeg
         */

        if (
            !profileImage.startsWith("http://") &&
            !profileImage.startsWith("https://")
        ) {

            imageUrl =
                `http://localhost:${BACKEND_PORT}${profileImage}`;
        }


        console.log(
            "Navbar Profile Image URL:",
            imageUrl
        );


        /* =================================================
           SET IMAGE
        ================================================= */

        photo.onload = function () {

            console.log(
                "Navbar profile image loaded successfully."
            );


            photo.style.display = "block";

            initials.style.display = "none";
        };


        /* =================================================
           IMAGE LOAD ERROR
        ================================================= */

        photo.onerror = function () {

            console.error(
                "Failed to load navbar profile image:",
                imageUrl
            );


            photo.style.display = "none";

            initials.style.display = "flex";

            setInitials(fullName);
        };


        /*
         * Set source AFTER onload/onerror
         * so browser events are captured.
         */

        photo.src = imageUrl;
    }


    /* =====================================================
       SHOW INITIALS
    ===================================================== */

    function showInitials(fullName) {

        const photo =
            document.getElementById(
                "navbarProfilePhoto"
            );


        const initials =
            document.getElementById(
                "navbarProfileInitials"
            );


        if (!photo || !initials) {
            return;
        }


        photo.style.display = "none";

        initials.style.display = "flex";

        setInitials(fullName);
    }


    /* =====================================================
       SET INITIALS
    ===================================================== */

    function setInitials(fullName) {

        const initials =
            document.getElementById(
                "navbarProfileInitials"
            );


        if (!initials) {
            return;
        }


        if (!fullName ||
            fullName.trim() === "") {

            initials.textContent = "CU";

            return;
        }


        const words =
            fullName
                .trim()
                .split(/\s+/);


        let result = "";


        if (words.length === 1) {

            result =
                words[0]
                    .substring(0, 2)
                    .toUpperCase();

        } else {

            result =
                (
                    words[0].charAt(0) +
                    words[words.length - 1].charAt(0)
                ).toUpperCase();
        }


        initials.textContent = result;
    }
	window.addEventListener(
	    "customerProfileUpdated",
	    function () {

	        console.log(
	            "Customer profile updated. Reloading navbar profile..."
	        );

	        loadNavbarProfile(customerId);
	    }
	);

});