import sum from "../sum";

// ✅ describe() is used to group related test cases together
describe("sum() function tests", () => {
  // ✅ Test 1: Basic positive numbers
  test("adds 10 + 5 correctly", () => {
    // 1️⃣ Arrange: define input values
    const num1 = 10;
    const num2 = 5;

    // 2️⃣ Act: call the function and store the output
    const result = sum(num1, num2);

    // 3️⃣ Assert: check if the output is what we expected
    expect(result).toBe(15);
  });

  // ✅ Test 2: Adding zero
  test("adds 10 + 0 correctly", () => {
    // 1️⃣ Arrange
    const num1 = 10;
    const num2 = 0;

    // 2️⃣ Act
    const result = sum(num1, num2);

    // 3️⃣ Assert
    expect(result).toBe(10);
  });

  // ✅ Test 3: Negative numbers
  test("adds -10 + 5 correctly", () => {
    // 1️⃣ Arrange
    const num1 = -10;
    const num2 = 5;

    // 2️⃣ Act
    const result = sum(num1, num2);

    // 3️⃣ Assert
    expect(result).toBe(-5);
  });

  // ✅ Test 4: Two negative numbers
  test("adds -10 + -5 correctly", () => {
    // 1️⃣ Arrange
    const num1 = -10;
    const num2 = -5;

    // 2️⃣ Act
    const result = sum(num1, num2);

    // 3️⃣ Assert
    expect(result).toBe(-15);
  });

  // ✅ Test 5: Decimal numbers
  test("adds 2.5 + 1.5 correctly", () => {
    // 1️⃣ Arrange
    const num1 = 2.5;
    const num2 = 1.5;

    // 2️⃣ Act
    const result = sum(num1, num2);

    // 3️⃣ Assert
    expect(result).toBe(4);
  });
});
