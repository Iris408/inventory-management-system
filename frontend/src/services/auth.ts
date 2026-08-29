import { LOGIN_URL } from "./api"

export const DEMO_USERNAME = "partspilot"
export const DEMO_PASSWORD = "PartsPilotDemo2026!"

export async function authenticate(
  username: string,
  password: string
): Promise<string> {
  const formData = new URLSearchParams()

  formData.append("username", username)
  formData.append("password", password)

  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type":
        "application/x-www-form-urlencoded",
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  const data = await response.json()

  const accessToken =
    data.access_token || data.token

  if (!accessToken) {
    throw new Error("No token returned")
  }

  return accessToken
}