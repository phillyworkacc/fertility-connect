export function validatePassword(str: string) {
   let regex = /[0-9!@#$%^&*(),.?":{}|<>]/;
   return regex.test(str)
}

export function validateEmail(email: string): boolean {
   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   return regex.test(email);
}
