<p align="center">
  <img src="https://github.com/MedusaCollins/secondChanges/assets/63819815/8ff0a47e-367c-48c5-8683-d7741924dc08" alt="Preview" />
</p>

# Turn Second Chances into Opportunities.
Welcome to SecondChances, a unique e-commerce platform that serves as a reminder to both buyers and sellers that life is full of second chances. Here, every product represents the beginning of a new story. We connect people who believe in opportunities and believe in giving things a second shot.


## Project Overview
"SecondChances" is a demo of a second-hand buying and selling platform I've created to test myself using the MERN stack. With its impressive features and modern design, it successfully sets itself apart.

Here's a brief summary of what I've accomplished in this project:

#### Mobile Compatibility
I've put significant effort into ensuring that the platform is accessible from anywhere by making it perform seamlessly on screens of all resolutions.

#### Dark Theme
Our platform offers a sleek and eye-friendly dark theme option, enhancing the user experience during low-light situations. Whether you're browsing products in the middle of the night or simply prefer a darker interface, our Dark Theme provides an elegant and comfortable browsing experience. It's designed to reduce eye strain and save battery life on your devices, allowing you to explore our platform effortlessly, day or night.


#### Account Creation and Product Listing
In second-hand buying and selling platforms, it's essential for users to create their accounts to buy items already on the platform or list their products for sale. I've stored user and product information in MongoDB, allowing the project to access these data in relevant sections.

#### Payment Options 
While SecondChances is a demo, I've aimed to make it as close to a real project as possible. To achieve this, I've incorporated iyzico services, enabling users to make purchases with their credit card information, just like real internet shopping in Turkey.

## Technologies Used
Our platform is powered by a modern technology stack, making it a seamless and efficient experience for our users. The key technologies we've used include:
<ul>
  <li>MongoDB: A NoSQL database for storing product and user information.</li>
  <li>Express.js: A Node.js web application framework for building the backend.</li>
  <li>React: A JavaScript library for building the user interface.</li>
  <li>Node.js: A JavaScript runtime environment for server-side scripting.</li>
  <li>Tailwind CSS: A utility-first CSS framework for creating a responsive and clean design.</li>
</ul>

## Features

#### Create an account / Log in
<ul>
  <li>Users can easily register in the system, creating an account by providing their details or logging in using their email or username for existing accounts.</li>
  <li>Having an account is essential for actions such as purchasing products, saving favorites, creating products, or editing profiles. Therefore, by registering, users gain access to a wide range of features.</li>
  <li>During the registration process, the passwords entered by users are securely stored in the backend using bcrypt, ensuring the safe storage of user information.</li>
</ul>

#### Products  
<ul>
  <li>Multiple product images</li>
  <li>Saveable with a like button</li>
  <li>Can be added to the shopping cart</li>
  <li>Editable name, description, price, and discounted price</li>
  <li>Product list ordering and sorting</li>
  <li>Comprehensive product search in the front store</li>
  <li>Two types of comment sections: Questions and offers</li>
</ul>

#### Search for products
<ul>
  <li>A user-friendly search bar that keeps track of your recent searches.</li>
  <li>Quickly search for previously looked-up items by simply clicking on them, or remove these items with a single click.</li>
</ul>

#### Cart
<ul>
  <li>Add/Remove any item to the cart using localStorage</li>
</ul>

#### Checkout
<ul>
  <li>Ability to checkout the items and pay</li>
  <li>Guest checkout</li>
</ul>

#### Payment Processing
<ul>
  <li>Card Validation: Users can check the validity of their card details.</li>
  <li>Order Summary: An overview of the total cost before finalizing the purchase.</li>
  <li>Form Entry: Users can enter their address and card information through a dedicated form.</li>
  <li>Payment Processing: Integration with Iyzico allows verification of card authenticity, and the purchase is only processed if the card is valid.</li>
</ul>

#### User Profile
<ul>
  <li>Customization: Users can easily personalize their names, emails, passwords, and photos as they wish.</li>
  <li>Reviews: A section where users can list their products for sale/sold and reviews of the products purchased from this user, including ratings and comments.</li>
  <li>Average Score: The average of the rating values received by the user after their sales is visible on the user's profile. This allows other users to know what to expect from this user's products in advance.</li>
</ul>

#### Product Management
<ul>
  <li>A dedicated section where previously uploaded products can be reviewed.</li>
  <li>If desired, users can easily edit the products they have previously uploaded.</li>
  <li>Users have the option to add new products from this section.</li>
</ul>

#### Order Management
<ul>
  <li>You can track both sold and purchased products.</li>
  <li>If you have sold a product, you can modify its status (e.g., whether it's in the preparation stage, shipped, or delivered). While these processes are typically automated in real-world logistics systems, this being a demo project, I have provided users with the option to adjust the status themselves.</li>
  <li>If the purchased product's status indicates that it has been delivered, you have the opportunity to leave a one-time rating and review for that product. Your review will be visible on the product's page and the seller's profile.</li>
</ul>
