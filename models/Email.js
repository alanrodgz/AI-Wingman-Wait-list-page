// Email.js - Updated to use Getform.io

export const addEmailToWaitlist = async (email) => {
  const formEndpoint = "https://getform.io/f/bxoodwla"; // Replace with your Getform.io endpoint

  try {
    const response = await fetch(formEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit email to Getform.io");
    }

    const result = await response.json();
    console.log("Email submitted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error submitting email:", error);
    throw error; // Propagate the error to the caller
  }
};