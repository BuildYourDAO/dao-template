import toast from 'react-hot-toast';
import { AnyObject, ObjectSchema, ValidationError } from 'yup';

export const validateSchema = async <T extends AnyObject>(
  schema: ObjectSchema<T>,
  values: T
) => {
  try {
    await schema.validate(values);
    return false;
  } catch (error: unknown) {
    const err = error as ValidationError;

    toast.error(err.message);
    return err;
  }
};
