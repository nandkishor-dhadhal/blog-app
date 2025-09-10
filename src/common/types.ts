export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Blog {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  authors: {
    name: string;
    avatar: string;
  };
}

export interface CardProps  {
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
  onEdit: () => void;
  onDelete: () => void;
};