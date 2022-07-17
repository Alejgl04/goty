export interface Auth {
  ok:    boolean;
  user:  User;
  token: string;
  message: string;
  errors: [];

}

export interface User {
  status:   boolean;
  name:     string;
  email:    string;
  role:     string;
  uid:      string;
}

export interface UserMessage {
  ok:    boolean;
  user:  User;
  message: string;
}
