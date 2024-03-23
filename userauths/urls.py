from django.urls import path
from userauths import views
from .views import check_authentication

app_name="userauths"

urlpatterns = [
    path("sign-up/", views.register_view,name="sign-up"),
    path("sign-in/", views.login_view,name="sign-in"),
    path("sign-out/", views.logout_view,name="sign-out"),
    path("shop/", views.shop_view,name="shop"),
    path("Shop/", views.shop2_view,name="shop2"),
    path("blog/",views.blog_view,name="blog"),
    path("blog2/",views.blog2_view,name="blog2"),
    path("about/", views.about_view,name="about"),
    path("contact/", views.contact_view,name="contact"),
    path('check-authentication/', check_authentication, name='check_authentication'),
    path('maps/', views.map_view, name="maps"),
    path('pedigree', views.product1_view,name="product1"),
    path('whiskas', views.product2_view,name="product2"),
    path('fishfood', views.product3_view,name="product3"),
    path('birdfood', views.product4_view,name="product4"),
    path('leash', views.product5_view,name="product5"),
    path('Dogbed', views.product6_view,name="product6"),
    path('aquarium', views.product7_view,name="product7"),
    path('cattree', views.product8_view,name="product8"),
    path('littersand', views.product9_view,name="product9"),
    path('toys', views.product10_view,name="product10"),
    path('petcage', views.product11_view,name="product11"),
    path('bathingbrush', views.product12_view,name="product12"),
    path('Trimmer', views.product13_view,name="product13"),
    path('soaps', views.product14_view,name="product14"),
    path('foodbowl', views.product15_view,name="product15"),
    path('clothes', views.product16_view,name="product16"),
    path('Automatic Pet Feeder', views.product17_view,name="product17"),
    path('Pet water fountains', views.product18_view,name="product18"),
    path('Pet cameras', views.product19_view,name="product19"),
    path('Pet dental care products', views.product20_view,name="product20"),
    path('Pet calming spray', views.product21_view,name="product21"),
]
