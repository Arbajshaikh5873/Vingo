# OTP Functionality Fix TODO

## Steps to Complete:

- [x] Step 1: Fix the `sendOtp` function in `backend/controllers/auth.controller.js` by adding `await` to `User.findOne({ email })`, ensuring OTP is saved before sending email, and adding console logging for debugging.
- [x] Step 2: Fix the `verifyOtp` function in `backend/controllers/auth.controller.js` by correcting the typo to `User.findOne({ email })`.
- [x] Step 3: Fix the `resetPassword` function in `backend/controllers/auth.controller.js` by adding `await` to `User.findOne({ email })` and `bcrypt.hash(newPassword, 10)`.
- [x] Step 4: After edits, suggest restarting the backend server and testing the OTP flow (e.g., via frontend or Postman).
- [x] Step 5: Verify no further issues; update TODO as completed.
