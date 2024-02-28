"use server"

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache'

/**
 * Handles the creation of a user.
 * If the `isEditing` flag is false, a new user is created with the provided form data.
 * 
 * @param {Object} formData - The form data containing user details.
 * @param {boolean} isEditing - A flag to indicate if it is an edit operation.
 * @returns {Object} - A success or error message.
 */
export async function handleUserCreate(formData, isEditing) {
    // Only proceed if not editing (creating a new user)
    if (!isEditing) {
        const firstName = formData.firstName;
        const lastName = formData.lastName;
        const email = formData.email;
        const role = formData.role;

        try {
            const result = await prisma.user.upsert({
                where: { email: email },
                update: {},
                create: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    role: {
                        connect: {
                            slug: role,
                        },
                    },
                },
            });

            // Revalidate the path to update the cache
            revalidatePath("/createUser");

            return {
                success: `User Created successfully`
            };
        } catch (error) {
            return {
                error: `Failed to create a new user`
            }
        }
    }
};

/**
 * Handles the editing of a user.
 * If the `isEditing` flag is true, the specified user is updated with the provided form data.
 * 
 * @param {Object} formData - The form data containing updated user details.
 * @param {boolean} isEditing - A flag to indicate if it is an edit operation.
 * @param {string} id - The unique identifier of the user to be edited.
 * @returns {Object} - A success or error message.
 */
export async function handleUserEdit(formData, isEditing, id) {
    // Only proceed if editing
    if (isEditing) {
        const firstName = formData.firstName;
        const lastName = formData.lastName;
        const email = formData.email;
        const role = formData.role;

        try {
            const result = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    role: {
                        connect: {
                            slug: role,
                        },
                    },
                },
            });

            // Revalidate the path to update the cache
            revalidatePath("/editUser");

            return {
                success: `User updated successfully`
            };
        } catch (error) {
            return {
                error: `Failed to update user`
            }
        }
    }
};

/**
 * Handles the deletion of a user by their unique identifier.
 * 
 * @param {string} id - The unique identifier of the user to be deleted.
 * @returns {Object} - A success or error message.
 */
export async function handleUserDelete(id) {
    try {
        const result = await prisma.user.delete({
            where: {
                id: id,
            },
        });

        // Revalidate the path to update the cache
        revalidatePath("/editUser");

        return {
            success: "User deleted successfully"
        }
    } catch (error) {
        return {
            success: "Failed to delete user"
        }
    }
};

/**
 * Toggles the status of a user in the database.
 * This function updates the status of a user based on the provided user ID and new status value.
 * It attempts to update the user's status in the database and handles any errors that might occur during the process.
 *
 * @param {string} id - The unique identifier of the user whose status is to be toggled.
 * @param {boolean} status - The new status to be applied to the user. This could represent any binary state, such as active/inactive.
 * @returns {Object} - An object containing a success message or an error message.
 */
export async function handleStatusToggle(id, status) {
    try {
        const result = await prisma.user.update({
            where: {
                id: id, // Specifies the user to update based on the unique identifier
            },
            data: {
                status: status, // Sets the new status for the user
            },
        });
    } catch (error) {
        return {
            error: `Failed updating user's status` 
        }
    }
};
/**
 * Retrieves a user from the database based on their unique identifier.
 * This function searches for a user by their ID and returns their details if found.
 * It selectively retrieves the user's ID, email, first name, last name, and role slug.
 *
 * @param {string} id - The unique identifier of the user to be retrieved.
 * @returns {Object|null} - An object containing the user's details if a user is found, or null if no user matches the provided ID.
 */
export async function getUser(id) {
    const user = await prisma.user.findFirst({
        where: {
            id: id, 
        },
        select: {
            id: true, 
            email: true, 
            firstName: true, 
            lastName: true, 
            role: {
                select: {
                    slug: true, 
                },
            },
        },
    });
    return user;
}
