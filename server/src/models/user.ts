import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define the attributes of the user
interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

// Define attributes for creation where id is optional
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  // Readonly attributes for created and updated timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Hash the password before saving the user
  public async setPassword(password: string): Promise<void> {
    const saltRounds = 10;
    console.log('Hashing password:', password);  // Log for debugging
    this.password = await bcrypt.hash(password, saltRounds); // Hash password
  }

  // Method to validate password
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.dataValues.password); // Compare hash and plaintext password
  }
}

// Factory function to initialize the User model
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure unique usernames
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',  // Specify table name
      sequelize,           // Pass sequelize instance
      hooks: {
        beforeCreate: async (user: User) => {
          console.log('Before Create Hook:', user); // Debugging hook to check if password is set
          if (user.password) {
            await user.setPassword(user.password); // Hash password before creating user
            console.log('Hashed password before save:', user.password);  // Debug log
          } else {
            console.log('No password provided during creation!');
          }
        },
        beforeUpdate: async (user: User) => {
          console.log('Before Update Hook:', user); // Debugging hook to check if password is set
          if (user.password) {
            await user.setPassword(user.password); // Hash password before updating user
            console.log('Hashed password before update:', user.password);  // Debug log
          } else {
            console.log('No password provided during update!');
          }
        },
      }
    }
  );

  return User;
}