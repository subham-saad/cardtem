export interface CardmainProps {
    user: {
      name: string;
      email: string;
      phone: string;
      website: string;
    };
    onDelete: () => void;
  }