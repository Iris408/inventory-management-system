def test_register_user_returns_created_user(client):
    response = client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "password": "TestPassword123!",
        },
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["username"] == "testuser"
    assert response_data["role"] == "user"
    assert "id" in response_data
    assert "password" not in response_data
    assert "hashed_password" not in response_data

def test_login_returns_access_token(client):
    client.post(
        "/auth/register",
        json={
            "username": "loginuser",
            "password": "TestPassword123!",
        },
    )

    response = client.post(
        "/auth/login",
        data={
            "username": "loginuser",
            "password": "TestPassword123!",
        },
    )

    assert response.status_code == 200

    response_data = response.json()

    assert "access_token" in response_data
    assert response_data["token_type"] == "bearer"
    assert response_data["access_token"]

def test_protected_endpoint_rejects_unauthenticated_request(client):
    response = client.get("/items/category-summary")

    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"