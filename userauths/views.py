from django.shortcuts import redirect,render
from userauths.forms import UserRegisterForm
from django.contrib.auth import login, authenticate
from django.contrib import messages
from django.conf import settings
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from userauths.models import User
from django.http import JsonResponse

# User=settings.AUTH_USER_MODEL

def register_view(request):
    
    if request.method=='POST':
        form=UserRegisterForm(request.POST or None)
        if form.is_valid():
            new_user=form.save()
            username=form.cleaned_data.get("username")
            messages.success(request,f"Hey {username}, Your account has been registered")
            new_user= authenticate(username=form.cleaned_data['email'],
                                   password=form.cleaned_data['password1'])
            login(request, new_user)
            return redirect("core:index")
    else:
        form=UserRegisterForm()
        
        
    context={
        'form': form,
    }
    return render(request,"userauths/sign-up.html", context)

def login_view(request):
    request.session['order_placed'] = True
    if request.user.is_authenticated:
        messages.warning(request,"Hey you are already logged in")
        return redirect("core:index")
    
    if request.method == "POST":
        email=request.POST.get("email")
        password=request.POST.get("password")
        
        try:
            user=User.objects.get(email=email)
            user=authenticate(request,email=email,password=password)
            
            if user is not None:
                login(request,user)
                messages.success(request,"You logged in successfully")
                return redirect("core:index")
            else:
                messages.warning(request,"User does not exist. Create an account")
        except:
            messages.warning(request,f"User with {email} does not exist")
    
    return render(request,"userauths/sign-in.html")


def logout_view(request):
    logout(request)
    messages.success(request,"You logged out")
    return redirect("userauths:sign-in")

def shop_view(request):
    return render(request,"userauths/shop.html")

def shop2_view(request):
    return render(request,"userauths/shop2.html")

def blog_view(request):
    return render(request,"userauths/blog.html")

def blog2_view(request):
    return render(request,"userauths/blog2.html")

def about_view(request):
    return render(request,"userauths/about.html")

def contact_view(request):
    return render(request,"userauths/contact.html")

@login_required
def checkout_view(request):
    return render(request, "userauths/checkout.html")

def check_authentication(request):
    authenticated = False  # Implement your authentication logic here
    return JsonResponse({'authenticated': authenticated})

def map_view(request):
    return render(request,"userauths/maps.html")

def product1_view(request):
    return render(request,"userauths/product1.html")

def product2_view(request):
    return render(request,"userauths/product2.html")

def product3_view(request):
    return render(request,"userauths/product3.html")

def product4_view(request):
    return render(request,"userauths/product4.html")

def product5_view(request):
    return render(request,"userauths/product5.html")

def product6_view(request):
    return render(request,"userauths/product6.html")

def product7_view(request):
    return render(request,"userauths/product7.html")

def product8_view(request):
    return render(request,"userauths/product8.html")

def product9_view(request):
    return render(request,"userauths/product9.html")

def product10_view(request):
    return render(request,"userauths/product10.html")

def product11_view(request):
    return render(request,"userauths/product11.html")

def product12_view(request):
    return render(request,"userauths/product12.html")

def product13_view(request):
    return render(request,"userauths/product13.html")

def product14_view(request):
    return render(request,"userauths/product14.html")

def product15_view(request):
    return render(request,"userauths/product15.html")

def product16_view(request):
    return render(request,"userauths/product16.html")

def product17_view(request):
    return render(request,"userauths/product17.html")

def product18_view(request):
    return render(request,"userauths/product18.html")

def product19_view(request):
    return render(request,"userauths/product19.html")

def product20_view(request):
    return render(request,"userauths/product20.html")

def product21_view(request):
    return render(request,"userauths/product21.html")