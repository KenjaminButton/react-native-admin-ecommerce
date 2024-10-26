'use client'; // Directive for Next.js to indicate the component is a client-side component

// Importing the authenticate function from the auth actions

import { authenticate } from '@/actions/auth';


// Importing Button component for UI with ShadCN/UI
import { Button } from '@/components/ui/button';
// Importing various form components for building the form UI with ShadCN/UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// Importing Input component for form fields with ShadCN/UI
import { Input } from '@/components/ui/input';
// Importing zodResolver to integrate Zod schema validation with react-hook-form
import { zodResolver } from '@hookform/resolvers/zod';
// Importing useRouter for programmatic navigation in Next.js
import { useRouter } from 'next/navigation';
// Importing useState hook for state management
import { useState } from 'react';
// Importing useForm hook for form management
import { useForm } from 'react-hook-form';
// Importing Zod for schema validation
import { z } from 'zod';

// Defining a schema for form validation using Zod
const loginSchema = z.object({
  // Validating email as a string and ensuring it is a valid email format
  email: z.string().email({ message: 'Invalid email address' }),
  // Validating password as a string with a minimum length of 6
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

// Default export of the Auth component
export default function Auth() {
  // Using useForm hook to manage form state and validation with the schema
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema), // Using zodResolver for validation
    defaultValues: {
      email: '', // Setting default email value
      password: '', // Setting default password value
    },
  });

  // useState hook to manage the isAuthenticating state
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // useRouter hook for navigation
  const router = useRouter();

  // Async function to handle form submission
  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    setIsAuthenticating(true); // Set authenticating state to true

    try {
      // console.log('email:::', email)
      // console.log('password:::', password)
      
      // Attempt to authenticate with given email and password
      await authenticate(email, password);
      // Navigate to the admin page on successful authentication
      router.push('/admin');
    } catch (error) {
      // Handle errors (intentionally left empty here)
    } finally {
      setIsAuthenticating(false); // Set authenticating state to false aka DONE
    }
  };

  // Rendering the component UI
  return (
    <div className='flex h-svh items-center justify-center'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control} // Passing form control to FormField
              name='email'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input
                      id='email' // Setting input ID
                      type='email' // Setting input type to email
                      placeholder='m@example.com' // Placeholder text for input
                      {...field} // Spreading field props from render function
                      disabled={isAuthenticating} // Disable input during authentication
                    />
                  </FormControl>
                  {/* Display Validation Messages */}
                  <FormMessage /> 
                </FormItem>
              )}
            />
            <FormField
              control={form.control} // Passing form control to FormField
              name='password'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <div className='flex items-center'>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      disabled={isAuthenticating} // Disable input during authentication
                      id='password' // Setting input ID
                      type='password' // Setting input type to password
                      {...field} // Spreading field props from render function
                    />
                  </FormControl>
                  {/* Display Validation Messages */}
                  <FormMessage /> 
                </FormItem>
              )}
            />
            <Button
              disabled={isAuthenticating} // Disable button during authentication
              type='submit' // Button type set to submit
              className='w-full' // Full width button for styling
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
