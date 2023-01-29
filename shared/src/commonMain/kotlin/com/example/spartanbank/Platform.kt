package com.example.spartanbank

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform